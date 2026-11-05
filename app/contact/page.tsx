"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import Link from "next/link";
import toast from "react-hot-toast";
import { BsArrowRight } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";

import {
  CONTACT_RECAPTCHA_ACTION,
  isValidContactEmail,
  isValidContactMessage,
  isValidContactName,
  isValidContactSubject,
  type ContactFormFields,
} from "@/lib/contact";
import { fadeIn } from "@/variants";

const FIELD_VALIDATORS: Record<
  keyof ContactFormFields,
  (value: string) => boolean
> = {
  name: isValidContactName,
  email: isValidContactEmail,
  subject: isValidContactSubject,
  message: isValidContactMessage,
};

interface ContactFormProps {
  executeRecaptcha?: (action?: string) => Promise<string>;
  isProtected?: boolean;
}

const ContactForm = ({ executeRecaptcha, isProtected = false }: ContactFormProps) => {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const hasAttemptedSubmit = useRef(false);

  const [form, setForm] = useState<ContactFormFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    const el = messageRef.current;
    if (!el) return;

    el.style.overflowY = "hidden";
    el.style.height = "auto";

    const nextHeight = el.scrollHeight;
    const maxHeight = Number.parseFloat(getComputedStyle(el).maxHeight);

    if (Number.isFinite(maxHeight) && nextHeight >= maxHeight) {
      el.style.height = `${maxHeight}px`;
      el.style.overflowY = "auto";
      return;
    }

    el.style.height = `${nextHeight}px`;
  }, [form.message]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name as keyof ContactFormFields;
    const value = e.target.value;

    setForm((prev) => ({ ...prev, [field]: value }));

    if (!hasAttemptedSubmit.current) return;

    const isInvalid = !FIELD_VALIDATORS[field](value);
    setFieldErrors((prev) =>
      prev[field] === isInvalid ? prev : { ...prev, [field]: isInvalid },
    );
  };

  const validateForm = () => {
    hasAttemptedSubmit.current = true;

    const nextErrors = {
      name: !isValidContactName(form.name),
      email: !isValidContactEmail(form.email),
      subject: !isValidContactSubject(form.subject),
      message: !isValidContactMessage(form.message),
    };

    setFieldErrors(nextErrors);

    return (
      !nextErrors.name &&
      !nextErrors.email &&
      !nextErrors.subject &&
      !nextErrors.message
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedSubject = form.subject.trim();
    const trimmedMessage = form.message.trim();

    const targetEmail = "yayanzebua15@gmail.com";
    const mailSubject = encodeURIComponent(`[Portofolio] ${trimmedSubject}`);
    const mailBody = encodeURIComponent(
      `Halo Yayan Zebua,\n\nSaya ingin mengirimkan pesan melalui portofolio Anda:\n\n👤 Nama Pengirim: ${trimmedName}\n✉️ Email Pengirim: ${trimmedEmail}\n📌 Subjek: ${trimmedSubject}\n\n📝 Isi Pesan:\n${trimmedMessage}\n\n---\nDikirim melalui formulir website modern-portfolio`
    );

    const isMobile =
      typeof navigator !== "undefined" &&
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const mailUrl = isMobile
      ? `mailto:${targetEmail}?subject=${mailSubject}&body=${mailBody}`
      : `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${mailSubject}&body=${mailBody}`;

    // Open email composer directly in response to user click
    window.open(mailUrl, "_blank", "noopener,noreferrer");

    // Silently save a record to local data/messages.json
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage,
        recaptchaToken: "email-submission",
      }),
    }).catch((err) => {
      console.warn("Background save to messages.json:", err);
    });

    toast.success(
      `Membuka Gmail untuk mengirim ke ${targetEmail}...`,
      { duration: 5000 }
    );

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setFieldErrors({
      name: false,
      email: false,
      subject: false,
      message: false,
    });
  };

  const handleSendWhatsApp = () => {
    if (!validateForm()) return;

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedSubject = form.subject.trim();
    const trimmedMessage = form.message.trim();

    const waMessageText = `Halo Yayan Zebua! 👋🌟

Saya menghubungi Anda melalui formulir kontak portofolio:

👤 *Nama:* ${trimmedName}
✉️ *Email:* ${trimmedEmail}
📌 *Subjek / Keperluan:* ${trimmedSubject}

📝 *Isi Pesan:*
${trimmedMessage}

Terima kasih banyak! 🤝`;

    const encodedText = encodeURIComponent(waMessageText);
    const waUrl = `https://api.whatsapp.com/send/?phone=6285262304452&text=${encodedText}`;

    // Silently save a copy to the local messages database
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage,
        recaptchaToken: "wa-submission",
      }),
    }).catch(() => { });

    // Open WhatsApp
    window.open(waUrl, "_blank", "noopener,noreferrer");

    toast.success("Membuka WhatsApp untuk mengirim pesan Anda...", { duration: 4000 });

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setFieldErrors({
      name: false,
      email: false,
      subject: false,
      message: false,
    });
  };

  return (
    <motion.form
      variants={fadeIn("up", 0.4)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="flex-1 flex flex-col gap-5 w-full mx-auto relative z-20"
      onSubmit={handleSubmit}
      autoComplete="off"
      autoCapitalize="off"
      noValidate
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-5 w-full">
        <div className="flex-1 min-w-0">
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            className="input w-full bg-white/[0.04] focus:bg-white/[0.08] focus:border-accent border border-white/20 rounded-xl px-5 h-12 text-sm text-white placeholder:text-white/40 transition-colors cursor-text focus:outline-hidden"
            value={form.name}
            onChange={handleChange}
            disabled={isLoading}
            aria-disabled={isLoading}
            maxLength={200}
            aria-invalid={fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          {fieldErrors.name && (
            <p id="name-error" className="mt-1.5 text-left text-xs text-accent" role="alert">
              Nama harus diisi dengan benar
            </p>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Alamat Email"
            className="input w-full bg-white/[0.04] focus:bg-white/[0.08] focus:border-accent border border-white/20 rounded-xl px-5 h-12 text-sm text-white placeholder:text-white/40 transition-colors cursor-text focus:outline-hidden"
            value={form.email}
            onChange={handleChange}
            disabled={isLoading}
            aria-disabled={isLoading}
            maxLength={100}
            aria-invalid={fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email && (
            <p id="email-error" className="mt-1.5 text-left text-xs text-accent" role="alert">
              Format email tidak valid
            </p>
          )}
        </div>
      </div>
      <div>
        <input
          id="contact-subject"
          type="text"
          name="subject"
          placeholder="Subjek Pesan / Keperluan Proyek"
          className="input w-full bg-white/[0.04] focus:bg-white/[0.08] focus:border-accent border border-white/20 rounded-xl px-5 h-12 text-sm text-white placeholder:text-white/40 transition-colors cursor-text focus:outline-hidden"
          value={form.subject}
          onChange={handleChange}
          disabled={isLoading}
          aria-disabled={isLoading}
          maxLength={200}
          aria-invalid={fieldErrors.subject}
          aria-describedby={fieldErrors.subject ? "subject-error" : undefined}
        />
        {fieldErrors.subject && (
          <p id="subject-error" className="mt-1.5 text-left text-xs text-accent" role="alert">
            Subjek pesan wajib diisi
          </p>
        )}
      </div>
      <div>
        <textarea
          id="contact-message"
          ref={messageRef}
          name="message"
          placeholder="Tuliskan pesan, pertanyaan, atau detail proyek Anda di sini..."
          className="textarea w-full bg-white/[0.04] focus:bg-white/[0.08] focus:border-accent border border-white/20 rounded-xl p-4 text-sm text-white placeholder:text-white/40 transition-colors cursor-text focus:outline-hidden resize-none min-h-[120px] max-h-[220px]"
          rows={4}
          value={form.message}
          onChange={handleChange}
          disabled={isLoading}
          aria-disabled={isLoading}
          maxLength={500}
          aria-invalid={fieldErrors.message}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
        />
        {fieldErrors.message && (
          <p id="message-error" className="mt-1.5 text-left text-xs text-accent" role="alert">
            Pesan tidak boleh kosong
          </p>
        )}
      </div>

      {/* Dual action buttons: WhatsApp & Email */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
        <button
          type="button"
          onClick={handleSendWhatsApp}
          disabled={isLoading}
          aria-disabled={isLoading}
          className="h-12 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-[#0a180f] font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
        >
          <RiWhatsappFill className="text-xl shrink-0" />
          <span>Kirim via WhatsApp</span>
        </button>

        <button
          type="submit"
          disabled={isLoading}
          aria-disabled={isLoading}
          className="h-12 px-6 rounded-full border border-white/30 hover:border-accent bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium text-sm flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:pointer-events-none group"
        >
          <span>{isLoading ? "Mengirim Email..." : "Kirim via Email"}</span>
          <BsArrowRight className="text-base text-accent group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      <p className="text-[11px] text-white/40 text-left">
        {isProtected
          ? "Formulir ini dilindungi oleh Google reCAPTCHA."
          : "Pesan Anda aman dan tersimpan langsung ke sistem."}
      </p>
    </motion.form>
  );
};

const ContactFormWithRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  return <ContactForm executeRecaptcha={executeRecaptcha} isProtected={true} />;
};

const ContactFormWithoutRecaptcha = () => {
  return <ContactForm isProtected={false} />;
};

const defaultWaText = encodeURIComponent(
  `Halo Yayan Zebua! 👋🌟

Saya baru saja melihat website portofolio Anda dan sangat terkesan dengan keahlian serta proyek Full Stack Web & Sistem Digital yang Anda bangun. 🚀🌐

Saya ingin berkonsultasi dan berdiskusi lebih lanjut mengenai:
🔹 Pembuatan Website & Aplikasi Digital Baru
🔹 Pengembangan Sistem Informasi & POS Kasir Toko
🔹 Peluang Kerjasama / Tawaran Proyek Freelance

Kira-kira kapan waktu luang yang tepat untuk kita bisa mengobrol dan berdiskusi lebih lanjut?

Terima kasih banyak sebelumnya! 🤝😊`
);

const Contact = () => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const isRealRecaptcha = Boolean(
    siteKey &&
    !siteKey.toUpperCase().includes("XXXX") &&
    siteKey.trim().length > 20
  );

  return (
    <div className="h-full bg-primary/30 overflow-y-auto">
      <div className="container mx-auto min-h-full flex flex-col justify-start items-center pt-28 sm:pt-32 xl:pt-36 pb-28 text-center xl:text-left xl:pr-20 2xl:pr-24 relative z-20">
        <div className="flex flex-col w-full max-w-[680px] my-auto">
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-center mb-6 xl:mb-8 text-[26px] sm:text-[32px] xl:text-[38px]"
          >
            Mari <span className="text-accent">Terhubung .</span>
          </motion.h2>

          {isRealRecaptcha && siteKey ? (
            <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
              <ContactFormWithRecaptcha />
            </GoogleReCaptchaProvider>
          ) : (
            <ContactFormWithoutRecaptcha />
          )}

          {/* Direct WhatsApp Action */}
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mt-8 pt-6 border-t border-white/10 text-center"
          >
            <p className="text-white/60 text-xs sm:text-sm mb-3">
              Atau ingin konsultasi cepat tanpa mengisi formulir?
            </p>
            <Link
              href={`https://api.whatsapp.com/send/?phone=6285262304452&text=${defaultWaText}`}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-x-2 bg-white/[0.05] hover:bg-[#25D366]/20 border border-white/15 hover:border-[#25D366]/60 text-white font-medium px-5 py-2.5 rounded-full transition-all duration-300 text-xs sm:text-sm shadow-md hover:scale-105"
            >
              <RiWhatsappFill className="text-lg sm:text-xl text-[#25D366]" />
              <span>Chat WhatsApp Langsung</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
