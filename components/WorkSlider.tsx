"use client";

import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import SkeletonImage from "@/components/SkeletonImage";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

type ProjectItem = {
  title: string;
  category: string;
  description: string;
  path: string;
  link: string;
};

const workSlides: {
  slides: {
    images: ProjectItem[];
  }[];
} = {
  slides: [
    {
      images: [
        {
          title: "Super Admin Pusat Gerabah Jakarta",
          category: "Enterprise ERP • AI Assistant",
          description: "Sistem ERP terpadu: omset, pergudangan, surat jalan (DO), penerimaan PO & AI Asisten PGJ.",
          path: "/pusatgerabah-superadmin.webp",
          link: "#",
        },
        {
          title: "E-Commerce Rumah Sprei Pamulang",
          category: "Toko Online • E-Commerce",
          description: "Platform etalase digital sprei & bedcover modern Pamulang dengan katalog dan filter responsif.",
          path: "/rumahspreipamulang.webp",
          link: "#",
        },
        {
          title: "SIPEKA - Sistem Perizinan Kelas",
          category: "Web & Mobile App • Akademik",
          description: "Aplikasi pelaporan izin kelas mahasiswa dengan upload surat bukti dokter & autentikasi NIM.",
          path: "/sipeka.webp",
          link: "#",
        },
        {
          title: "KASUR - Sistem Koperasi Simpan Pinjam",
          category: "Sistem Keuangan • Fintech",
          description: "Manajemen simpan pinjam anggota koperasi, pembukuan kas otomatis & visualisasi arus kas.",
          path: "/kasur.webp",
          link: "#",
        },
      ],
    },
    {
      images: [
        {
          title: "Z-PMS - Sistem Informasi Manajemen Gadai",
          category: "Fintech & Gadai • Web & Mobile App",
          description: "Platform digital Koperasi Jasa Zai Berkat Mandiri: monitoring berkas aktif, otomatisasi tempo, pembukuan kas, dan portal nasabah.",
          path: "/zaycell.webp",
          link: "#",
        },
        {
          title: "Maull Cell - POS & Inventaris Konter",
          category: "Point of Sale • Retail & Servis HP",
          description: "Sistem kasir & operasional konter servis handphone: rekap transaksi penjualan, inventaris suku cadang, serta pelacakan hutang.",
          path: "/maullcell.webp",
          link: "#",
        },
        {
          title: "Smart Library Navigator IoT",
          category: "Internet of Things • Smart Campus",
          description: "Sistem perpustakaan pintar SMA Hang Tuah 1 Jakarta berbasis IoT & mikrokontroler ESP32 terintegrasi katalog digital dan panduan rak.",
          path: "/iot.webp",
          link: "#",
        },
        {
          title: "RESTful API & Auth Gateway",
          category: "Backend Architecture • Cloud Security",
          description: "Arsitektur microservices terproteksi token JWT, kontrol hak akses berbasis role (RBAC), optimasi database, dan integrasi lintas modul.",
          path: "/project-api-gateway.webp",
          link: "#",
        },
      ],
    },
  ],
};

const WorkSlider = () => {
  return (
    <Swiper
      spaceBetween={14}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="h-[340px] sm:h-[480px] xl:h-[500px]"
    >
      {workSlides.slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="grid grid-cols-2 grid-rows-2 gap-2.5 sm:gap-4 h-[300px] sm:h-[440px] xl:h-[455px]">
            {slide.images.map((image, imageI) => (
              <div
                className="relative rounded-xl overflow-hidden group border border-white/10 bg-[#131424] shadow-lg"
                key={imageI}
              >
                <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                  <SkeletonImage
                    src={image.path}
                    alt={image.title}
                    width={520}
                    height={320}
                    loading="lazy"
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-108"
                  />

                  {/* Top category badge for immediate context */}
                  <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 z-10 pointer-events-none">
                    <span className="bg-black/85 backdrop-blur-md text-accent text-[8.5px] sm:text-[11px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full border border-accent/30 line-clamp-1">
                      {image.category.split("•")[0]?.trim()}
                    </span>
                  </div>

                  {/* Gradient Overlay with Project Details - Always visible on mobile, hover on desktop */}
                  <div
                    className="absolute inset-0 bg-linear-to-t from-[#0e0725]/95 via-[#0e0725]/60 to-transparent sm:via-[#1a0b3b]/85 sm:to-black/30 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-2 sm:p-4 z-20"
                  >
                    <span className="text-accent text-[8px] sm:text-[11px] font-semibold tracking-wider uppercase mb-0.5 sm:mb-1 hidden sm:block">
                      {image.category}
                    </span>

                    <h3 className="text-white font-bold text-[11px] sm:text-base leading-snug mb-0.5 sm:mb-1 line-clamp-1">
                      {image.title}
                    </h3>

                    <p className="text-white/75 text-[10px] sm:text-xs line-clamp-2 mb-2 hidden sm:block leading-snug">
                      {image.description}
                    </p>

                    <Link
                      href={image.link}
                      className="inline-flex items-center gap-x-1 sm:gap-x-1.5 text-accent group-hover:text-white text-[9px] sm:text-xs font-semibold tracking-wider transition-colors duration-200"
                    >
                      <span>LIHAT PROYEK</span>
                      <BsArrowRight className="text-xs sm:text-sm transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default WorkSlider;
