export type FadeDirection = "up" | "down" | "left" | "right";

export const fadeIn = (direction: FadeDirection, delay: number) => {
  const scaledDelay = Math.min(delay * 0.1, 0.04);
  return {
    hidden: {
      y: direction === "up" ? 8 : direction === "down" ? -8 : 0,
      opacity: 0.85,
      x: direction === "left" ? 8 : direction === "right" ? -8 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween" as const,
        duration: 0.18,
        delay: scaledDelay,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };
};
