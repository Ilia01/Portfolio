"use client";

import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number; // ms per character
  delay?: number; // ms delay before starting
  showCursor?: boolean;
}

export function TypewriterText({
  text,
  className = "",
  speed = 80,
  delay = 300,
  showCursor = true,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text);
      return;
    }

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let i = 0;

      const typeInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <span
          className="inline-block w-[3px] h-[1em] bg-green-500 ml-1 rounded-sm"
          style={{
            animation: isTyping ? "none" : "blink 1s step-end infinite",
            verticalAlign: "middle",
          }}
        />
      )}
    </span>
  );
}
