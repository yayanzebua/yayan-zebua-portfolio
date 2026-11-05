"use client";

import React, { useState } from "react";
import Image, { type ImageProps } from "next/image";

interface SkeletonImageProps extends Omit<ImageProps, "onLoad"> {
  wrapperClassName?: string;
  skeletonClassName?: string;
  onLoadCallback?: () => void;
}

export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  src,
  alt,
  wrapperClassName = "",
  skeletonClassName = "",
  className = "",
  loading = "lazy",
  priority = false,
  onLoadCallback,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(priority);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {/* Shimmering Skeleton Placeholder (only if not yet loaded) */}
      {!isLoaded && (
        <div
          className={`absolute inset-0 z-0 bg-[#15172b] animate-skeleton-shimmer ${skeletonClassName}`}
          aria-hidden="true"
        />
      )}

      {/* Next.js Optimized Image */}
      <Image
        src={src}
        alt={alt}
        loading={priority ? undefined : loading}
        priority={priority}
        decoding="async"
        onLoad={() => {
          setIsLoaded(true);
          onLoadCallback?.();
        }}
        className={`${className} relative z-10 transition-opacity duration-150 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        {...rest}
      />
    </div>
  );
};

export default SkeletonImage;
