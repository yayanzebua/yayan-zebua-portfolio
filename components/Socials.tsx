import Link from "next/link";
import type { IconType } from "react-icons";
import {
  RiWhatsappLine,
  RiFacebookLine,
  RiInstagramLine,
  RiGithubLine,
} from "react-icons/ri";

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

export const socialData: { name: string; link: string; Icon: IconType }[] = [
  {
    name: "WhatsApp",
    link: `https://api.whatsapp.com/send/?phone=6285262304452&text=${defaultWaText}`,
    Icon: RiWhatsappLine,
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/yayanzebua",
    Icon: RiFacebookLine,
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/yayanzheb/",
    Icon: RiInstagramLine,
  },
  {
    name: "Github",
    link: "https://github.com/yayanzebua",
    Icon: RiGithubLine,
  },
];

const Socials = () => {
  return (
    <div className="flex items-center gap-x-5 text-xl">
      {socialData.map((social, i) => (
        <Link
          key={i}
          title={social.name}
          href={social.link}
          target="_blank"
          rel="noreferrer noopener"
          className={`${
            social.name === "Github"
              ? "bg-accent rounded-full p-1.5 hover:bg-accent/80 text-white"
              : "hover:text-accent"
          } transition-all duration-300 flex items-center justify-center`}
        >
          <social.Icon aria-hidden className="text-xl" />
          <span className="sr-only">{social.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
