import ProjectsBtn from "@/components/ProjectsBtn";
import Avatar from "@/components/Avatar";
import SkeletonImage from "@/components/SkeletonImage";
import ParticlesContainer from "@/components/ParticlesContainer";

const Home = () => {
  return (
    <div className="bg-primary/60 h-full overflow-y-auto xl:overflow-hidden">
      <div className="w-full min-h-full xl:h-full bg-linear-to-r from-primary/10 via-black/30 to-black/10 flex items-center">
        <div className="text-center flex flex-col justify-center xl:text-left h-full container mx-auto relative z-20 pt-20 sm:pt-24 pb-28 xl:pt-40 xl:pb-0">
          
          {/* Mobile Full Portrait Avatar (Transparent Cutout - No Dark Circle) */}
          <div className="flex xl:hidden justify-center mb-4 sm:mb-5 animate-hero-avatar">
            <div className="relative w-auto h-64 sm:h-76 md:h-80 max-h-[270px] sm:max-h-[320px] flex items-end justify-center select-none pointer-events-none">
              <SkeletonImage
                src="/yayanzebuaweb.webp"
                alt="Yayan Zebua - Full Stack Programmer"
                width={480}
                height={580}
                priority={true}
                wrapperClassName="w-auto h-full flex items-end justify-center"
                className="w-auto h-full max-h-[260px] sm:max-h-[310px] object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
              />
            </div>
          </div>

          <h1 className="h1 text-[24px] sm:text-[32px] md:text-[42px] xl:text-[50px] xl:leading-[1.18] max-w-lg xl:max-w-xl mx-auto xl:mx-0 mb-3 sm:mb-4 xl:mb-8 animate-hero-title">
            Merancang Sistem <br />
            <span className="whitespace-nowrap">
              Web &amp; <span className="text-accent">Solusi Digital</span>
            </span>
          </h1>

          <p className="max-w-sm sm:max-w-md xl:max-w-xl mx-auto xl:mx-0 mb-6 sm:mb-8 xl:mb-16 text-white/80 text-xs sm:text-sm xl:text-base leading-relaxed animate-hero-desc px-2 sm:px-0">
            Mahasiswa Teknik Informatika &amp; Full Stack Programmer di Pusat
            Gerabah Jakarta. Berdedikasi merancang dan mengembangkan sistem web
            modern, efisien, serta interaktif yang mengubah ide bisnis menjadi
            solusi digital berdampak nyata.
          </p>

          <div className="flex justify-center xl:hidden relative animate-hero-btn scale-90 sm:scale-100 pb-6 sm:pb-8">
            <ProjectsBtn />
          </div>
          <div className="hidden xl:flex animate-hero-btn">
            <ProjectsBtn />
          </div>
        </div>
      </div>
      <div className="w-7xl h-full absolute right-0 bottom-0 pointer-events-none">
        <div
          role="img"
          className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0"
          aria-hidden
        />

        <ParticlesContainer />

        <div className="w-full h-full max-w-[460px] xl:max-w-[520px] 2xl:max-w-[560px] max-h-[82vh] xl:max-h-[86vh] absolute bottom-0 right-0 xl:right-[4%] 2xl:right-[8%] flex items-end justify-center pointer-events-none animate-hero-avatar">
          <Avatar className="hidden xl:flex w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Home;
