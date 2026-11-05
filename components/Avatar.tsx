import SkeletonImage from "@/components/SkeletonImage";

type AvatarProps = {
  src?: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

const Avatar = ({
  src = "/yayanzebuaweb.webp",
  alt = "Yayan Zebua",
  className = "hidden xl:flex",
  imageClassName = "",
  priority = true,
}: AvatarProps) => {
  return (
    <div
      className={`items-end justify-center pointer-events-none select-none ${className}`}
    >
      <SkeletonImage
        src={src}
        alt={alt}
        width={1086}
        height={1448}
        priority={priority}
        wrapperClassName="w-auto h-full flex items-end justify-center"
        skeletonClassName="rounded-3xl bg-white/[0.03]"
        className={`translate-z-0 w-auto h-full max-h-[75vh] xl:max-h-[82vh] object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] ${imageClassName}`}
      />
    </div>
  );
};

export default Avatar;
