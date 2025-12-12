"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Hexagon {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  blur: number;
  duration: number;
  delay: number;
}

// Fixed positions for consistent layout
const HEXAGON_CONFIGS: Omit<Hexagon, "id">[] = [
  { x: 10, y: 15, size: 120, opacity: 0.15, blur: 30, duration: 25, delay: 0 },
  { x: 85, y: 10, size: 100, opacity: 0.12, blur: 25, duration: 30, delay: 2 },
  { x: 75, y: 60, size: 80, opacity: 0.18, blur: 20, duration: 22, delay: 1 },
  { x: 20, y: 70, size: 90, opacity: 0.14, blur: 28, duration: 28, delay: 3 },
  { x: 50, y: 20, size: 70, opacity: 0.1, blur: 35, duration: 35, delay: 0.5 },
  { x: 90, y: 80, size: 110, opacity: 0.16, blur: 22, duration: 26, delay: 1.5 },
  { x: 5, y: 45, size: 85, opacity: 0.13, blur: 32, duration: 32, delay: 2.5 },
  { x: 60, y: 85, size: 95, opacity: 0.11, blur: 28, duration: 24, delay: 4 },
];

function HexagonShape({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
    >
      <polygon points="50,2 95,25 95,75 50,98 5,75 5,25" />
    </svg>
  );
}

export function FloatingHexagons() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (!mounted || prefersReducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {HEXAGON_CONFIGS.map((hex, index) => (
        <motion.div
          key={index}
          className="absolute text-green-500 dark:text-green-400"
          style={{
            left: `${hex.x}%`,
            top: `${hex.y}%`,
            filter: `blur(${hex.blur}px)`,
            opacity: hex.opacity,
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 40, -20, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
            rotate: [0, 15, -10, 20, 0],
          }}
          transition={{
            duration: hex.duration,
            delay: hex.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <HexagonShape size={hex.size} />
        </motion.div>
      ))}
    </div>
  );
}
