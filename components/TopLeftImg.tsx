"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const TopLeftImg = () => {
  const pathname = usePathname();
  const isHidden = pathname === "/about";

  return (
    <div
      className={`absolute left-0 top-0 mix-blend-color-dodge z-10 w-50 xl:w-100 opacity-50 pointer-events-none select-none transition-opacity duration-200 ${
        isHidden ? "opacity-0 invisible" : ""
      }`}
      aria-hidden="true"
    >
      <Image
        src="/top-left-img.webp"
        alt="left cover bg"
        width={400}
        height={400}
        priority={true}
        className="w-full h-auto object-contain"
      />
    </div>
  );
};

export default TopLeftImg;
