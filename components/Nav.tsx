"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
} from "react-icons/hi2";

export const navData: { name: string; path: string; Icon: IconType }[] = [
  { name: "beranda", path: "/", Icon: HiHome },
  { name: "tentang", path: "/about", Icon: HiUser },
  { name: "layanan", path: "/services", Icon: HiRectangleGroup },
  { name: "proyek", path: "/work", Icon: HiViewColumns },
  {
    name: "testimoni",
    path: "/testimonials",
    Icon: HiChatBubbleBottomCenterText,
  },
  {
    name: "kontak",
    path: "/contact",
    Icon: HiEnvelope,
  },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-50 flex flex-col items-center xl:top-0 xl:bottom-auto xl:left-auto xl:right-[2%] xl:w-16 xl:max-w-md xl:h-screen xl:justify-center pointer-events-none">
      <div className="flex w-full xl:flex-col items-center justify-around sm:justify-between xl:justify-center gap-y-10 px-3 sm:px-8 md:px-40 xl:px-0 h-16 sm:h-20 xl:h-max py-2 sm:py-8 bg-[#0f1020]/95 sm:bg-white/10 backdrop-blur-md border-t border-white/10 xl:border-0 text-2xl sm:text-3xl xl:text-xl xl:rounded-full shadow-lg shadow-black/40 pointer-events-auto">
        {navData.map((link, i) => (
          <Link
            prefetch={true}
            className={`${
              link.path === pathname ? "text-accent scale-110" : "text-white/70 hover:text-white"
            } relative flex items-center justify-center p-2 sm:p-2.5 group hover:text-accent active:scale-90 transition-all duration-150 cursor-pointer select-none`}
            href={link.path}
            key={i}
          >
            <div
              role="tooltip"
              className="absolute pr-14 right-0 hidden xl:group-hover:flex"
            >
              <div className="bg-white relative flex text-primary items-center p-1.5 rounded-[3px]">
                <div className="text-[12px] leading-none font-semibold capitalize">
                  {link.name}
                </div>

                <div
                  className="border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2"
                  aria-hidden
                />
              </div>
            </div>

            <div>
              <link.Icon aria-hidden />
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
