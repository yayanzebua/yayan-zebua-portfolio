"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`bg-white/5 animate-skeleton-shimmer rounded-md ${className}`}
      aria-hidden="true"
    />
  );
};

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#131424] shadow-lg flex flex-col justify-between p-3.5 sm:p-5 h-full">
      {/* Background shimmer representing image */}
      <div className="absolute inset-0 bg-[#15172b] animate-skeleton-shimmer" />

      {/* Top category badge skeleton */}
      <div className="relative z-10 flex justify-between items-center">
        <Skeleton className="w-24 sm:w-28 h-5 sm:h-6 rounded-full bg-white/10" />
      </div>

      {/* Bottom title & description skeleton */}
      <div className="relative z-10 flex flex-col gap-y-2 mt-auto">
        <Skeleton className="w-3/4 h-4 sm:h-5 rounded bg-white/15" />
        <Skeleton className="w-full h-3 rounded bg-white/10 hidden sm:block" />
        <Skeleton className="w-2/3 h-3 rounded bg-white/10 hidden sm:block" />
        <div className="flex items-center gap-x-2 pt-1">
          <Skeleton className="w-20 h-3 rounded bg-accent/30" />
        </div>
      </div>
    </div>
  );
};

export const WorkSliderSkeleton: React.FC = () => {
  return (
    <div className="w-full h-[320px] sm:h-[480px] xl:h-[500px] flex flex-col justify-between">
      <div className="grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4 h-[280px] sm:h-[440px] xl:h-[455px]">
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </div>
      {/* Pagination bullets skeleton */}
      <div className="flex justify-center items-center gap-x-2 mt-2">
        <Skeleton className="w-2.5 h-2.5 rounded-full bg-accent/60" />
        <Skeleton className="w-2.5 h-2.5 rounded-full bg-white/20" />
      </div>
    </div>
  );
};

export const ServiceCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[rgba(65,47,123,0.18)] border border-white/5 h-[270px] sm:h-[285px] rounded-xl px-6 py-6 flex flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 bg-white/[0.02] animate-skeleton-shimmer pointer-events-none" />
      <div className="relative z-10">
        <Skeleton className="w-10 h-10 rounded-lg bg-accent/30 mb-4" />
        <Skeleton className="w-3/4 h-5 rounded bg-white/20 mb-3" />
        <Skeleton className="w-full h-3.5 rounded bg-white/10 mb-2" />
        <Skeleton className="w-5/6 h-3.5 rounded bg-white/10 mb-2" />
        <Skeleton className="w-2/3 h-3.5 rounded bg-white/10" />
      </div>
      <div className="relative z-10 flex justify-end">
        <Skeleton className="w-6 h-6 rounded-full bg-white/10" />
      </div>
    </div>
  );
};

export const ServiceSliderSkeleton: React.FC = () => {
  return (
    <div className="w-full h-75 sm:h-90 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <ServiceCardSkeleton />
      <div className="hidden sm:block">
        <ServiceCardSkeleton />
      </div>
      <div className="hidden sm:block">
        <ServiceCardSkeleton />
      </div>
    </div>
  );
};

export const TestimonialSliderSkeleton: React.FC = () => {
  return (
    <div className="w-full h-100 flex items-center justify-center px-8 md:px-16">
      <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-4xl bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.02] animate-skeleton-shimmer pointer-events-none" />
        
        {/* Avatar & Name Skeleton */}
        <div className="flex flex-col items-center text-center relative z-10 w-full md:w-48 shrink-0">
          <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/15 mb-3 ring-2 ring-accent/30" />
          <Skeleton className="w-28 h-4 rounded bg-white/20 mb-2" />
          <Skeleton className="w-20 h-3 rounded bg-accent/30" />
        </div>

        {/* Quote content skeleton */}
        <div className="flex-1 flex flex-col gap-y-3 relative z-10 w-full">
          <Skeleton className="w-10 h-8 rounded bg-white/15 mb-1" />
          <Skeleton className="w-full h-4 rounded bg-white/10" />
          <Skeleton className="w-11/12 h-4 rounded bg-white/10" />
          <Skeleton className="w-3/4 h-4 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
};
