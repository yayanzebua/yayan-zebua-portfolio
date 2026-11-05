"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "react-countup";
import {
  FaCss3,
  FaFigma,
  FaHtml5,
  FaJs,
  FaReact,
  FaWordpress,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import { SiFramer, SiNextdotjs } from "react-icons/si";
import { TbBrandAdobePhotoshop, TbBrandAdobeXd } from "react-icons/tb";

import Avatar from "@/components/Avatar";
import Circles from "@/components/Circles";
import SkeletonImage from "@/components/SkeletonImage";
import { fadeIn } from "@/variants";

type AboutInfoItem = {
  title: string;
  stage?: string;
  icons?: IconType[];
};

type AboutSection = {
  title: string;
  info: AboutInfoItem[];
};

export const aboutData: AboutSection[] = [
  {
    title: "Keahlian",
    info: [
      {
        title: "Web Programming (Next.js, React, Node.js, TypeScript, PHP, MySQL)",
        icons: [FaHtml5, FaCss3, FaJs, FaReact, SiNextdotjs],
      },
      {
        title: "Database & Backend Architecture (MySQL, REST API, Laravel, JWT Auth)",
        icons: [FaWordpress, SiFramer],
      },
      {
        title: "UI/UX & Modern Tools (Tailwind CSS, Figma, Git, Postman)",
        icons: [FaFigma, TbBrandAdobePhotoshop, TbBrandAdobeXd],
      },
    ],
  },
  {
    title: "Pengalaman",
    info: [
      {
        title: "Full Stack Programmer - Pusat Gerabah Jakarta",
        stage: "2023 - Sekarang",
      },
      {
        title: "Web Developer Freelance & Software Project Lead",
        stage: "2022 - 2023",
      },
    ],
  },
  {
    title: "Pendidikan",
    info: [
      {
        title: "Lulusan SMK Negeri 1 Lahewa",
        stage: "2016 - 2019",
      },
      {
        title: "S1 Teknik Informatika - Mahasiswa Aktif",
        stage: "Semester 5 (IPK 3.85)",
      },
      {
        title: "Pelatihan & Sertifikasi Full Stack Web Development",
        stage: "2023",
      },
    ],
  },
  {
    title: "Pencapaian",
    info: [
      {
        title: "Rancang Bangun Sistem Informasi Manajemen & POS Pusat Gerabah",
        stage: "2023 - 2024",
      },
      {
        title: "Juara / Partisipan Kompetisi Coding & Hackathon Mahasiswa",
        stage: "2023",
      },
    ],
  },
];

const About = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="h-full bg-primary/30 overflow-y-auto xl:overflow-hidden relative">
      <div className="min-h-full xl:h-full w-full pt-24 sm:pt-28 pb-28 xl:py-0 flex items-center text-center xl:text-left relative">
        <Circles />

      {/* Floating Portrait Avatar on the Left */}
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex absolute bottom-[6vh] xl:bottom-[8vh] left-0 xl:left-4 2xl:left-8 max-h-[74vh] z-20 pointer-events-none"
      >
        <Avatar
          src="/yayanzebuaweb2.webp"
          className="h-full"
          imageClassName="max-h-[66vh] xl:max-h-[72vh] 2xl:max-h-[76vh] object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
        />
      </motion.div>

      {/* Main Content Container with safe right padding to avoid nav collision */}
      <div className="container mx-auto h-full flex flex-col items-center justify-center xl:flex-row gap-x-10 xl:pl-72 2xl:pl-80 xl:pr-24 2xl:pr-28">
        {/* Left Column: Heading, Bio & Counter Stats */}
        <div className="flex-1 flex flex-col justify-center relative z-20 xl:max-w-[480px]">
          {/* Mobile Portrait Avatar (Transparent & Separated from Name) */}
          <motion.div
            variants={fadeIn("down", 0.05)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex xl:hidden flex-col items-center justify-center mb-6 pt-2"
          >
            {/* Transparent Cutout Photo (No Dark Box / No Square Background) */}
            <div className="relative w-auto h-48 sm:h-56 flex items-end justify-center select-none pointer-events-none">
              <SkeletonImage
                src="/yayanzebuaweb2.webp"
                alt="Yayan Zebua - Full Stack Programmer"
                width={360}
                height={420}
                priority={true}
                wrapperClassName="w-auto h-full flex items-end justify-center"
                className="w-auto h-full max-h-[195px] sm:max-h-[230px] object-contain object-bottom drop-shadow-[0_12px_28px_rgba(0,0,0,0.7)]"
              />
            </div>

            {/* Clean Centered 2-Line Name & Title (No Dots) */}
            <div className="mt-3 px-6 py-2 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/15 shadow-lg flex flex-col items-center justify-center text-center select-none">
              <span className="text-sm sm:text-[15px] font-bold text-white tracking-wide leading-tight">
                Yayan Zebua
              </span>
              <span className="text-xs sm:text-[13px] font-medium text-white/80 tracking-wide mt-0.5">
                Fullstack Programmer
              </span>
            </div>
          </motion.div>

          <motion.h2
            variants={fadeIn("right", 0.05)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-[24px] sm:text-[30px] xl:text-[34px] 2xl:text-[38px] xl:leading-[1.25] mb-3"
          >
            Dedikasi Kode &amp; Logika, <br />
            Membangun <span className="text-accent">Sistem Digital.</span>
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.08)}
            initial="hidden"
            animate="show"
            className="max-w-125 mx-auto xl:mx-0 mb-5 xl:mb-6 px-2 xl:px-0 text-white/80 text-xs sm:text-sm xl:text-[14px] leading-relaxed"
          >
            Sebagai Mahasiswa Teknik Informatika dan Full Stack Programmer di Pusat
            Gerabah Jakarta, saya berfokus pada pengembangan sistem aplikasi web
            yang tangguh, efisien, dan memiliki antarmuka pengguna yang modern
            serta intuitif.
          </motion.p>

          <motion.div
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            animate="show"
            className="flex max-w-sm sm:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-5 xl:mb-6"
          >
            <div className="grid grid-cols-2 2xl:grid-cols-4 gap-4 2xl:gap-x-6 w-full max-w-md 2xl:max-w-none">
              <div className="relative flex-1 2xl:after:w-px 2xl:after:h-full 2xl:after:bg-white/10 2xl:after:absolute 2xl:after:top-0 2xl:after:right-0">
                <div className="text-xl xl:text-2xl font-extrabold text-accent mb-0.5">
                  <CountUp start={0} end={3} duration={1.5} />+
                </div>
                <div className="text-[11px] uppercase tracking-[1px] leading-[1.3] text-white/70">
                  Tahun Pengalaman
                </div>
              </div>

              <div className="relative flex-1 2xl:after:w-px 2xl:after:h-full 2xl:after:bg-white/10 2xl:after:absolute 2xl:after:top-0 2xl:after:right-0">
                <div className="text-xl xl:text-2xl font-extrabold text-accent mb-0.5">
                  <CountUp start={0} end={20} duration={1.5} />+
                </div>
                <div className="text-[11px] uppercase tracking-[1px] leading-[1.3] text-white/70">
                  Proyek Web &amp; Sistem
                </div>
              </div>

              <div className="relative flex-1 2xl:after:w-px 2xl:after:h-full 2xl:after:bg-white/10 2xl:after:absolute 2xl:after:top-0 2xl:after:right-0">
                <div className="text-xl xl:text-2xl font-extrabold text-accent mb-0.5">
                  <CountUp start={0} end={15} duration={1.5} />+
                </div>
                <div className="text-[11px] uppercase tracking-[1px] leading-[1.3] text-white/70">
                  Teknologi &amp; Tools
                </div>
              </div>

              <div className="relative flex-1">
                <div className="text-xl xl:text-2xl font-extrabold text-accent mb-0.5">
                  <CountUp start={0} end={100} duration={1.5} />%
                </div>
                <div className="text-[11px] uppercase tracking-[1px] leading-[1.3] text-white/70">
                  Komitmen Kualitas
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: 4 Tabs & Content Cards */}
        <motion.div
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col w-full xl:w-[460px] 2xl:w-[500px] shrink-0"
        >
          {/* Elegant Horizontal Tab Bar */}
          <div className="flex items-center gap-x-4 sm:gap-x-7 border-b border-white/10 pb-3 mb-4 w-full overflow-x-auto scroll-smooth justify-center xl:justify-start">
            {aboutData.map((item, itemI) => {
              const isActive = index === itemI;
              return (
                <button
                  key={itemI}
                  type="button"
                  onClick={() => setIndex(itemI)}
                  className={`relative pb-1 text-xs sm:text-sm xl:text-[15px] font-semibold transition-colors duration-150 cursor-pointer select-none whitespace-nowrap ${isActive
                      ? "text-accent"
                      : "text-white/60 hover:text-white"
                    }`}
                >
                  {item.title}
                  {isActive && (
                    <span className="absolute left-0 -bottom-3.5 w-full h-[2.5px] bg-accent rounded-full shadow-sm shadow-accent/50" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instantaneous High-Performance Content Cards */}
          <div className="w-full min-h-[220px] flex flex-col gap-y-2.5">
            {aboutData[index].info.map((item, itemI) => (
              <div
                key={itemI}
                className="w-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-accent/40 rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-colors duration-150"
              >
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-white/95 text-xs sm:text-sm xl:text-[14px] leading-snug">
                    {item.title}
                  </span>
                  {item.icons && item.icons.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 text-lg text-white/80">
                      {item.icons.map((Icon, iconI) => (
                        <div
                          key={iconI}
                          className="p-1 rounded-md bg-white/10 hover:text-accent hover:bg-white/20 transition-colors"
                        >
                          <Icon />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {item.stage && (
                  <div className="self-start sm:self-center shrink-0">
                    <span className="inline-block text-[10px] xl:text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30 whitespace-nowrap">
                      {item.stage}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </div>
  );
};

export default About;
