"use client";

import { motion } from "framer-motion";

import Bulb from "@/components/Bulb";
import Circles from "@/components/Circles";
import ServiceSlider from "@/components/ServiceSlider";
import { fadeIn } from "@/variants";

const Services = () => {
  return (
    <div className="h-full bg-primary/30 overflow-y-auto xl:overflow-hidden relative">
      <div className="min-h-full xl:h-full w-full pt-24 sm:pt-28 pb-28 xl:py-0 flex items-center">
        <Circles />
        <div className="container mx-auto xl:pr-16 2xl:pr-20">
          <div className="flex flex-col xl:flex-row gap-x-8 items-center">
            <div className="text-center flex xl:w-[30vw] flex-col lg:text-left mb-6 xl:mb-0">
              <motion.h2
                variants={fadeIn("up", 0.05)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="h2 text-[26px] sm:text-[34px] xl:text-[42px] xl:mt-8"
              >
                Layanan Saya <span className="text-accent">.</span>
              </motion.h2>
              <motion.p
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="mb-4 max-w-105 mx-auto lg:mx-0 text-white/80 text-xs sm:text-sm xl:text-base leading-relaxed px-2 sm:px-0"
              >
                Menyediakan solusi rekayasa web menyeluruh, mulai dari perancangan
                antarmuka modern, sistem backend terintegrasi, hingga pengembangan
                sistem informasi bisnis yang andal dan terukur.
              </motion.p>
            </div>

            <motion.div
              variants={fadeIn("down", 0.12)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="w-full xl:max-w-[65%]"
            >
              <ServiceSlider />
            </motion.div>
          </div>
        </div>
        <Bulb />
      </div>
    </div>
  );
};

export default Services;
