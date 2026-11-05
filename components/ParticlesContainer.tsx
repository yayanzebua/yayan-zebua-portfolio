"use client";

import { useEffect, useState } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const particlesOptions: ISourceOptions = {
  fullScreen: { enable: false },
  background: {
    color: {
      value: "",
    },
  },
  fpsLimit: 30,
  interactivity: {
    events: {
      onClick: {
        enable: false,
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: { enable: true },
    },
    modes: {
      repulse: {
        distance: 130,
        duration: 0.35,
      },
    },
  },
  particles: {
    color: {
      value: "#e68e2e",
    },
    links: {
      color: "#f5d393",
      distance: 120,
      enable: true,
      opacity: 0.32,
      width: 1,
    },
    collisions: {
      enable: false,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 0.7,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        width: 800,
      },
      value: 24,
    },
    opacity: {
      value: 0.4,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: {
        min: 1,
        max: 2.8,
      },
    },
  },
  detectRetina: false,
};

const initParticles = async (engine: Engine) => {
  await loadSlim(engine);
};

const ParticlesContainer = () => {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    // Mount after main thread has fully painted and settled (idle)
    if (typeof window !== "undefined" && window.innerWidth >= 1200) {
      const scheduleRender = () => {
        setCanRender(true);
      };

      if ("requestIdleCallback" in window) {
        const handle = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
          scheduleRender,
          { timeout: 800 }
        );
        return () => {
          if ("cancelIdleCallback" in window) {
            (window as unknown as { cancelIdleCallback: (h: number) => void }).cancelIdleCallback(handle);
          }
        };
      } else {
        const timer = setTimeout(scheduleRender, 350);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  if (!canRender) return null;

  return (
    <div className="w-full h-full absolute translate-z-0 pointer-events-none opacity-0 animate-fade-in">
      <ParticlesProvider init={initParticles}>
        <Particles
          className="w-full h-full"
          id="tsparticles"
          options={particlesOptions}
        />
      </ParticlesProvider>
    </div>
  );
};

export default ParticlesContainer;
