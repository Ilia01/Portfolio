"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const isScrollingDown = currentY > lastScrollY.current;
          const pastThreshold = currentY > 100;

          setScrolled(currentY > 50);

          if (!pastThreshold) {
            // Always show nav near the top
            setVisible(true);
          } else if (isScrollingDown) {
            // Scrolling down: hide
            setVisible(false);

            // Clear any existing pause timer
            if (pauseTimer.current) {
              clearTimeout(pauseTimer.current);
              pauseTimer.current = null;
            }
          } else {
            // Scrolling up: show immediately
            setVisible(true);
          }

          // Set a pause timer — if user stops scrolling for 1s while hidden, show nav
          if (pauseTimer.current) {
            clearTimeout(pauseTimer.current);
          }
          if (pastThreshold && isScrollingDown) {
            pauseTimer.current = setTimeout(() => {
              setVisible(true);
            }, 1000);
          }

          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = [
    { id: "work", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "about", label: "About" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-lg border-b border-rule/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("hero")}
          className="font-serif text-xl text-amber hover:text-amber-light transition-colors"
          aria-label="Scroll to top"
        >
          IG
        </button>

        <div className="flex items-center gap-6 sm:gap-8 font-mono text-sm tracking-wide">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-stone hover:text-cream transition-colors hidden sm:block"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("work")}
            className="text-stone hover:text-cream transition-colors sm:hidden"
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-amber hover:text-amber-light transition-colors border border-amber/30 px-3 py-1.5 rounded hover:border-amber/50"
          >
            Contact
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
