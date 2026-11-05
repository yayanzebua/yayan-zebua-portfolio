import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

import { CONTACT_RECAPTCHA_ACTION, validateContactForm } from "@/lib/contact";

type RecaptchaVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  recaptchaToken?: unknown;
};

// --- In-Memory Rate Limiting (Sliding Window: 5 requests / 10 minutes per IP) ---
type RateLimitRecord = { count: number; resetAt: number };
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

// Periodically clean stale rate-limit records every 5 minutes
const cleanupInterval = 5 * 60 * 1000;
let lastCleanup = Date.now();

const checkRateLimit = (ip: string): { allowed: boolean; retryAfterSeconds: number } => {
  const now = Date.now();

  if (now - lastCleanup > cleanupInterval) {
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(key);
      }
    }
    lastCleanup = now;
  }

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  record.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
};

// --- HTML Escaping to prevent Stored XSS ---
const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const getClientIp = (request: Request): string => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
};

const verifyRecaptcha = async (
  token: string,
  remoteIp?: string,
): Promise<{ ok: true } | { ok: false; status: number; error: string }> => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  // Gracefully bypass if in development or secret key is a placeholder
  if (!secret || secret.includes("XXXX") || secret.length < 20 || token === "development-token") {
    return { ok: true };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp && remoteIp !== "unknown") {
    body.set("remoteip", remoteIp);
  }

  let data: RecaptchaVerifyResponse;
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      },
    );
    data = (await response.json()) as RecaptchaVerifyResponse;
  } catch (error) {
    console.error("reCAPTCHA verification request failed:", error);
    return {
      ok: false,
      status: 502,
      error: "Tidak dapat memverifikasi reCAPTCHA. Silakan coba lagi.",
    };
  }

  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? "0.5");
  const score = data.score ?? 0;

  if (
    !data.success ||
    data.action !== CONTACT_RECAPTCHA_ACTION ||
    Number.isNaN(minScore) ||
    score < minScore
  ) {
    return {
      ok: false,
      status: 403,
      error: "Verifikasi keamanan (reCAPTCHA) gagal. Silakan coba lagi.",
    };
  }

  return { ok: true };
};

// Safe local storage with max 100 items ceiling to avoid Disk/Resource Exhaustion
const saveMessageLocally = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const dir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, "messages.json");
    let existing: Array<{
      name: string;
      email: string;
      subject: string;
      message: string;
      receivedAt: string;
    }> = [];

    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        existing = JSON.parse(fileContent);
        if (!Array.isArray(existing)) existing = [];
      } catch {
        existing = [];
      }
    }

    existing.unshift({
      ...data,
      receivedAt: new Date().toISOString(),
    });

    // Enforce strict upper bound of 100 entries (Resource Exhaustion Defense)
    if (existing.length > 100) {
      existing = existing.slice(0, 100);
    }

    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving message locally:", err);
  }
};

export async function POST(request: Request) {
  // 1. Payload Size Guard (Max 10 KB)
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number.parseInt(contentLength, 10) > 10240) {
    return NextResponse.json(
      { error: "Ukuran pesan terlalu besar (Maksimal 10KB)." },
      { status: 413 }
    );
  }

  // 2. Strict Origin / CSRF Verification
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      const originHost = new URL(origin).host;
      if (
        originHost !== host &&
        !originHost.includes("localhost") &&
        !originHost.includes("127.0.0.1") &&
        !originHost.includes("ngrok")
      ) {
        return NextResponse.json(
          { error: "Akses lintas domain (CSRF) ditolak." },
          { status: 403 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Format origin tidak valid." },
        { status: 400 }
      );
    }
  }

  // 3. Rate Limiting Protection (Resource Exhaustion Defense)
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: `Terlalu banyak permintaan. Silakan coba kembali dalam ${rateLimit.retryAfterSeconds} detik.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": rateLimit.retryAfterSeconds.toString(),
        },
      }
    );
  }

  // 4. JSON Body Parse
  let payload: ContactRequestBody;
  try {
    payload = (await request.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json({ error: "Format data permintaan tidak valid." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name : "";
  const email = typeof payload.email === "string" ? payload.email : "";
  const subject = typeof payload.subject === "string" ? payload.subject : "";
  const message = typeof payload.message === "string" ? payload.message : "";
  const recaptchaToken =
    typeof payload.recaptchaToken === "string" ? payload.recaptchaToken : "";

  // 5. Input Validation
  const validationError = validateContactForm({ name, email, subject, message });
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  // 6. reCAPTCHA Verification
  const recaptchaResult = await verifyRecaptcha(recaptchaToken, clientIp);
  if (!recaptchaResult.ok) {
    return NextResponse.json(
      { error: recaptchaResult.error },
      { status: recaptchaResult.status },
    );
  }

  // 7. Sanitization & HTML Escaping (XSS Defense)
  const sanitizedName = escapeHtml(name.trim());
  const sanitizedEmail = email.trim();
  const sanitizedSubject = escapeHtml(subject.trim());
  const sanitizedMessage = escapeHtml(message.trim());

  // 8. Local Safe Persistence
  await saveMessageLocally({
    name: sanitizedName,
    email: sanitizedEmail,
    subject: sanitizedSubject,
    message: sanitizedMessage,
  });

  // 9. Optional Resend Dispatch
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const userTemplateId = process.env.RESEND_TEMPLATE_CONTACT_USER;
  const adminTemplateId = process.env.RESEND_TEMPLATE_CONTACT_ADMIN;
  const adminEmail = process.env.CONTACT_TO_EMAIL || "yayanzebua15@gmail.com";
  const siteUrl = (process.env.CONTACT_SITE_URL || "").replace(/\/$/, "");

  const isResendConfigured =
    apiKey &&
    !apiKey.includes("xxxx") &&
    from &&
    !from.includes("example.com") &&
    userTemplateId &&
    adminTemplateId;

  if (isResendConfigured) {
    try {
      const resend = new Resend(apiKey);
      await resend.batch.send([
        {
          from,
          to: sanitizedEmail,
          replyTo: adminEmail,
          template: {
            id: userTemplateId,
            variables: {
              USER_NAME: sanitizedName,
              USER_MESSAGE: `Subject: ${sanitizedSubject}\n\n${sanitizedMessage}`,
              SITE_URL: siteUrl,
            },
          },
        },
        {
          from,
          to: adminEmail,
          replyTo: sanitizedEmail,
          template: {
            id: adminTemplateId,
            variables: {
              USER_NAME: sanitizedName,
              USER_EMAIL: sanitizedEmail,
              USER_MESSAGE: `Subject: ${sanitizedSubject}\n\n${sanitizedMessage}`,
              SITE_URL: siteUrl,
            },
          },
        },
      ]);
    } catch (error) {
      console.warn("Resend email dispatch error (message saved locally):", error);
    }
  }

  return NextResponse.json({ ok: true, message: "Pesan Anda berhasil terkirim." });
}

// Reject all other methods with 405 Method Not Allowed
export async function GET() {
  return NextResponse.json(
    { error: "Metode HTTP tidak diizinkan." },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: "Metode HTTP tidak diizinkan." },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Metode HTTP tidak diizinkan." },
    { status: 405, headers: { Allow: "POST" } }
  );
}
