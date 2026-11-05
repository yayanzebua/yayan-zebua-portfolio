"use client";

import { FaQuoteLeft } from "react-icons/fa";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import SkeletonImage from "@/components/SkeletonImage";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonialData = [
  {
    image: "/t-avt-1.webp",
    name: "Budi Santoso",
    position: "Operational Head • Pusat Gerabah Jakarta",
    message:
      "Sistem informasi inventaris dan POS kasir yang dikembangkan Yayan membawa perubahan signifikan bagi toko kami. Pencatatan stok ratusan varian keramik kini jauh lebih akurat, cepat, dan transparan tanpa selisih pembukuan.",
  },
  {
    image: "/t-avt-2.webp",
    name: "Rina Anggraini",
    position: "Marketing Lead • E-Commerce Gerabah",
    message:
      "Website katalog digital dan toko online gerabah rancangan Yayan sangat memudahkan pelanggan kami dalam memilih produk. UI-nya elegan, responsif di HP, dan alur transaksinya sangat mudah dipahami.",
  },
  {
    image: "/t-avt-3.webp",
    name: "Ir. Hendra Wijaya, M.T.",
    position: "Dosen Teknik Informatika",
    message:
      "Yayan adalah mahasiswa yang tekun dengan pemahaman arsitektur sistem dan logika pemrograman yang sangat matang. Setiap proyek rekayasa perangkat lunak dikerjakan dengan kode yang terstruktur dan siap pakai di industri.",
  },
];

const TestimonialSlider = () => {
  return (
    <Swiper
      navigation
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className="h-[360px] sm:h-100"
    >
      {testimonialData.map((person, i) => (
        <SwiperSlide key={i}>
          <div className="flex flex-col items-center md:flex-row gap-x-8 h-full px-4 sm:px-8 md:px-16">
            <div className="w-full max-w-75 flex flex-col xl:justify-center items-center relative mx-auto xl:mx-0">
              <div className="flex flex-col justify-center text-center">
                <div className="mb-2 mx-auto">
                  <SkeletonImage
                    src={person.image}
                    width={90}
                    height={90}
                    alt={person.name}
                    loading="lazy"
                    wrapperClassName="w-[90px] h-[90px] rounded-full ring-2 ring-accent/40 overflow-hidden mx-auto"
                    skeletonClassName="rounded-full bg-white/10"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <div className="text-lg font-bold text-white">{person.name}</div>

                <div className="text-[11px] sm:text-[12px] uppercase font-semibold text-accent tracking-wider mt-1">
                  {person.position}
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center before:w-px xl:before:bg-white/20 xl:before:absolute xl:before:left-0 xl:before:h-50 relative xl:pl-20">
              <div className="mb-3 sm:mb-4">
                <FaQuoteLeft
                  className="text-3xl xl:text-5xl text-accent/30 mx-auto md:mx-0"
                  aria-hidden
                />
              </div>

              <div className="text-sm sm:text-base xl:text-lg text-white/85 text-center md:text-left leading-relaxed">
                &ldquo;{person.message}&rdquo;
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSlider;
