"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ScrambleTextProps {
  phrases: string[];
  className?: string;
  scrambleSpeed?: number; // ms per character lock-in
  pauseDuration?: number; // ms to pause between phrases
}

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function ScrambleText({
  phrases,
  className = "",
  scrambleSpeed = 50,
  pauseDuration = 3000,
}: ScrambleTextProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState(phrases[0]);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomChar = useCallback(() => {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }, []);

  const scrambleToPhrase = useCallback(
    (targetPhrase: string, currentLength: number) => {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setIsScrambling(true);
      let progress = 0;
      const maxLength = Math.max(currentLength, targetPhrase.length);

      intervalRef.current = setInterval(() => {
        const result = targetPhrase
          .padEnd(maxLength, " ")
          .split("")
          .map((char, i) => {
            if (i < progress) return char;
            if (char === " ") return " ";
            return getRandomChar();
          })
          .join("")
          .trimEnd();

        setDisplayText(result);

        if (progress >= targetPhrase.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setDisplayText(targetPhrase);
          setIsScrambling(false);
        }

        progress++;
      }, scrambleSpeed);
    },
    [scrambleSpeed, getRandomChar]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Initial scramble effect on mount
    const initialTimeout = setTimeout(() => {
      scrambleToPhrase(phrases[0], phrases[0].length);
    }, 500);

    return () => clearTimeout(initialTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isScrambling) return;

    const cycleTimeout = setTimeout(() => {
      const nextIndex = (currentPhraseIndex + 1) % phrases.length;
      setCurrentPhraseIndex(nextIndex);
      scrambleToPhrase(phrases[nextIndex], displayText.length);
    }, pauseDuration);

    return () => clearTimeout(cycleTimeout);
  }, [currentPhraseIndex, phrases, pauseDuration, isScrambling, scrambleToPhrase, displayText.length]);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // If user prefers reduced motion, just show static text that changes
  if (prefersReducedMotion) {
    return <span className={className}>{phrases[currentPhraseIndex]}</span>;
  }

  return (
    <span className={`${className} font-mono`} aria-label={phrases[currentPhraseIndex]}>
      {displayText}
    </span>
  );
}
