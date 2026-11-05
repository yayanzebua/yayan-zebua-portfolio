import Link from "next/link";

import Socials from "@/components/Socials";

const Header = () => {
  return (
    <header className="absolute z-30 w-full items-center px-4 sm:px-16 xl:px-0 xl:h-22.5 pointer-events-none">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-center py-4 sm:py-6">
          <Link
            prefetch
            href="/"
            className="text-xl sm:text-2xl lg:text-[28px] tracking-wide font-sora select-none hover:opacity-90 transition-opacity pointer-events-auto"
          >
            <span className="font-extrabold text-white">Yayan</span>{" "}
            <span className="font-light text-white/90">Zebua</span>
            <span className="text-accent font-extrabold">.</span>
          </Link>

          <div className="pointer-events-auto">
            <Socials />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
