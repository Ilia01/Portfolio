"use client";

import { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check for touch device
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );

    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsTouchDevice(true); // Treat as touch device to disable cursor
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Move dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      // Check for interactive elements (throttled via RAF)
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button";

      setIsHovering(!!isClickable);
    };

    // Smooth ring follow using RAF
    const animateRing = () => {
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.15);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.15);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(animateRing);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Ring - follows with smooth lerp */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-green-400 transition-all duration-200 ease-out ${
            isHovering ? "w-14 h-14" : "w-10 h-10"
          }`}
        />
      </div>

      {/* Dot - follows cursor exactly */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400 transition-all duration-150 ease-out ${
            isHovering ? "w-1 h-1" : "w-2 h-2"
          }`}
        />
      </div>
    </>
  );
}
