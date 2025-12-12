"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HexagonConfig {
  x: number;
  y: number;
  size: number;
  opacity: number;
  blur: number;
  duration: number;
  delay: number;
}

// Reduced to 5 hexagons for better performance
const HEXAGON_CONFIGS: HexagonConfig[] = [
  { x: 10, y: 15, size: 120, opacity: 0.12, blur: 30, duration: 25, delay: 0 },
  { x: 85, y: 10, size: 100, opacity: 0.10, blur: 25, duration: 30, delay: 2 },
  { x: 75, y: 60, size: 80, opacity: 0.14, blur: 20, duration: 22, delay: 1 },
  { x: 20, y: 70, size: 90, opacity: 0.11, blur: 28, duration: 28, delay: 3 },
  { x: 50, y: 40, size: 70, opacity: 0.08, blur: 35, duration: 35, delay: 0.5 },
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ willChange: "transform" }}>
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
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
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
