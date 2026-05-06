"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { profileData, SECTIONS, TRACKED_SECTION_IDS } from "@/lib/data";
import { useActiveSection } from "@/hooks/use-active-section";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ticking = useRef(false);

  const active = useActiveSection(TRACKED_SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const isScrollingDown = currentY > lastScrollY.current;
          const pastThreshold = currentY > 100;

          setScrolled(currentY > 50);

          if (!pastThreshold) {
            setVisible(true);
          } else if (isScrollingDown) {
            setVisible(false);
            if (pauseTimer.current) {
              clearTimeout(pauseTimer.current);
              pauseTimer.current = null;
            }
          } else {
            setVisible(true);
          }

          if (pauseTimer.current) clearTimeout(pauseTimer.current);
          if (pastThreshold && isScrollingDown) {
            pauseTimer.current = setTimeout(() => setVisible(true), 1000);
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
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

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
      <div className="px-6 sm:px-10 py-5 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("hero")}
          className="font-serif text-xl text-amber hover:text-amber-light transition-colors"
          aria-label="Scroll to top"
        >
          IG
        </button>

        <div className="flex items-center gap-5 sm:gap-7 font-mono text-sm tracking-wide">
          {SECTIONS.filter((s) => s.id !== "contact").map((link) => {
            const isActive = active === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative hidden sm:inline-flex items-center pl-3.5 transition-colors ${
                  isActive ? "text-cream" : "text-stone hover:text-cream"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-dot"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber"
                  />
                )}
                {link.label}
              </button>
            );
          })}

          {/* Mobile: just Work, no active state shown */}
          <button
            onClick={() => scrollToSection("work")}
            className="text-stone hover:text-cream transition-colors sm:hidden"
          >
            Work
          </button>

          <a
            href={profileData.resumeUrl}
            download
            className="text-stone hover:text-cream transition-colors hidden md:block"
          >
            Résumé
          </a>

          <button
            onClick={() => scrollToSection("contact")}
            className={`relative inline-flex items-center gap-2 transition-all border px-3.5 py-1.5 rounded ${
              active === "contact"
                ? "text-amber-light border-amber/70 bg-amber/10"
                : "text-amber border-amber/40 hover:border-amber/70 hover:bg-amber/5"
            }`}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber/60 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
            </span>
            Hire me
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
