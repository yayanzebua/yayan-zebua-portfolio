"use client";

import { motion } from "framer-motion";

import TestimonialSlider from "@/components/TestimonialSlider";
import { fadeIn } from "@/variants";

const Testimonials = () => {
  return (
    <div className="h-full bg-primary/30 overflow-y-auto xl:overflow-hidden relative">
      <div className="min-h-full xl:h-full w-full pt-24 sm:pt-28 pb-28 xl:py-0 text-center flex items-center">
        <div className="container mx-auto h-full flex flex-col justify-center xl:pr-16 2xl:pr-20">
          <motion.h2
            variants={fadeIn("up", 0.05)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 mb-6 sm:mb-8 xl:mb-12 text-[24px] sm:text-[34px] xl:text-[42px]"
          >
            Apa Kata <span className="text-accent">Rekan &amp; Klien .</span>
          </motion.h2>

          <motion.div
            variants={fadeIn("up", 0.12)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <TestimonialSlider />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
