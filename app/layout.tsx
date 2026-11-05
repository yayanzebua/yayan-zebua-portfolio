import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import Header from "@/components/Header";
import Nav from "@/components/Nav";
import TopLeftImg from "@/components/TopLeftImg";

import "./globals.css";

export const metadata: Metadata = {
  title: "Yayan Zebua | Portfolio",
  description:
    "Yayan Zebua adalah Mahasiswa Teknik Informatika & Full Stack Programmer di Pusat Gerabah Jakarta, berdedikasi membangun solusi web modern, efisien, dan interaktif.",
  keywords: [
    "react",
    "next",
    "nextjs",
    "html",
    "css",
    "javascript",
    "typescript",
    "modern-ui",
    "portfolio",
    "full-stack developer",
    "yayan zebua",
  ],
  authors: [{ name: "Yayan Zebua" }],
  other: {
    "theme-color": "#f13024",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-sora page bg-site text-white bg-cover bg-no-repeat relative"
      >
        <TopLeftImg />
        <Header />
        <main className="w-full h-full relative z-0">
          {children}
        </main>
        <Nav />
        <aside>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#393a47",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              },
            }}
          />
        </aside>
      </body>
    </html>
  );
}
