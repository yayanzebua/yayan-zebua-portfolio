"use client";

import {
  RxCode,
  RxLayers,
  RxGear,
  RxDesktop,
  RxRocket,
  RxArrowTopRight,
} from "react-icons/rx";
import type { IconType } from "react-icons";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const serviceData: {
  Icon: IconType;
  title: string;
  description: string;
}[] = [
  {
    Icon: RxCode,
    title: "Full Stack Web",
    description:
      "Pengembangan web modern dari frontend hingga backend menggunakan Next.js, React, dan sistem arsitektur yang tangguh.",
  },
  {
    Icon: RxLayers,
    title: "Sistem Informasi",
    description:
      "Rancang bangun sistem inventaris, otomasi alur transaksi, dan manajemen operasional bisnis seperti di Pusat Gerabah Jakarta.",
  },
  {
    Icon: RxGear,
    title: "API & Database",
    description:
      "Perancangan database relasional (MySQL / PostgreSQL) serta integrasi REST API yang aman, cepat, dan terstruktur rapi.",
  },
  {
    Icon: RxDesktop,
    title: "UI/UX & Desain Web",
    description:
      "Pembuatan antarmuka visual yang interaktif, elegan, dan responsif sempurna di perangkat desktop, tablet, maupun smartphone.",
  },
  {
    Icon: RxRocket,
    title: "Optimasi & Performa",
    description:
      "Peningkatan kecepatan loading website, audit performa teknis SEO, dan pemeliharaan keamanan sistem secara berkelanjutan.",
  },
];

const ServiceSlider = () => {
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      freeMode
      className="h-75 sm:h-90"
    >
      {serviceData.map((item, i) => (
        <SwiperSlide key={i}>
          <div className="bg-[rgba(65,47,123,0.18)] border border-white/5 hover:border-accent/40 h-[270px] sm:h-[285px] rounded-xl px-6 py-6 flex flex-col justify-between group cursor-pointer hover:bg-[rgba(89,65,169,0.22)] transition-all duration-300">
            <div>
              <div className="text-4xl text-accent mb-3">
                <item.Icon aria-hidden />
              </div>

              <div className="mb-2 text-lg font-semibold text-white/95">
                {item.title}
              </div>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="text-2xl pt-2 flex justify-end">
              <RxArrowTopRight
                className="group-hover:rotate-45 group-hover:text-accent text-white/40 transition-all duration-300"
                aria-hidden
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ServiceSlider;
