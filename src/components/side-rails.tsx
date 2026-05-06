"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { profileData, SECTIONS, TRACKED_SECTION_IDS } from "@/lib/data";
import { useActiveSection } from "@/hooks/use-active-section";

type State = "passed" | "active" | "pending";

export function SideRails() {
  const [pastHero, setPastHero] = useState(false);
  const ticking = useRef(false);
  const active = useActiveSection(TRACKED_SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setPastHero(window.scrollY > window.innerHeight * 0.6);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  // Determine state of each section based on active position
  const activeIndex = SECTIONS.findIndex((s) => s.id === active);
  const stateFor = (i: number): State => {
    if (activeIndex === -1) return "pending";
    if (i < activeIndex) return "passed";
    if (i === activeIndex) return "active";
    return "pending";
  };

  return (
    <>
      {/* Left rail: section spine with progress states */}
      <AnimatePresence>
        {pastHero && (
          <motion.nav
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            aria-label="Section navigation"
            className="group fixed left-6 lg:left-10 top-1/2 -translate-y-1/2 z-40 hidden md:block"
          >
            <ul className="flex flex-col gap-1">
              {SECTIONS.map((section, i) => {
                const state = stateFor(i);
                return (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollTo(section.id)}
                      className="flex items-center gap-3 py-1.5 outline-none focus-visible:outline-amber"
                      aria-label={`Go to ${section.label}`}
                      aria-current={state === "active" ? "true" : undefined}
                    >
                      {/* Index */}
                      <span
                        className={`font-mono text-[10px] tracking-[0.15em] tabular-nums transition-colors duration-300 ${
                          state === "active"
                            ? "text-amber"
                            : state === "passed"
                              ? "text-amber/40"
                              : "text-rule"
                        }`}
                      >
                        {section.index}
                      </span>

                      {/* Dot — sized by state */}
                      <span className="relative flex items-center justify-center w-3.5 h-3.5">
                        {state === "active" && (
                          <motion.span
                            layoutId="rail-active-halo"
                            transition={{
                              type: "spring",
                              stiffness: 320,
                              damping: 28,
                            }}
                            className="absolute inset-0 rounded-full border border-amber/40"
                          />
                        )}
                        <span
                          className={`block rounded-full transition-all duration-300 ${
                            state === "active"
                              ? "w-1.5 h-1.5 bg-amber"
                              : state === "passed"
                                ? "w-1 h-1 bg-amber/50"
                                : "w-1 h-1 bg-ash group-hover:bg-stone"
                          }`}
                        />
                      </span>

                      {/* Label — only active visible by default; rail hover reveals others */}
                      <span
                        className={`font-mono text-[11px] tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-300 ${
                          state === "active"
                            ? "text-cream opacity-100 translate-x-0"
                            : state === "passed"
                              ? "text-stone opacity-0 -translate-x-2 group-hover:opacity-90 group-hover:translate-x-0"
                              : "text-ash opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      >
                        {section.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Right rail: email vertical + back-to-top */}
      <AnimatePresence>
        {pastHero && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed right-8 lg:right-12 bottom-0 z-40 hidden md:flex flex-col items-center gap-5"
          >
            <button
              onClick={scrollToTop}
              className="text-ash hover:text-amber transition-colors duration-200 mb-1"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <a
              href={`mailto:${profileData.contact.email}`}
              className="font-mono text-xs text-ash hover:text-amber tracking-[0.12em] transition-colors duration-200"
              style={{ writingMode: "vertical-rl" }}
            >
              {profileData.contact.email}
            </a>
            <div className="w-px h-24 bg-rule" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile: floating back-to-top */}
      <AnimatePresence>
        {pastHero && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={scrollToTop}
            className="fixed right-6 bottom-8 z-40 md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-rule bg-raised/80 backdrop-blur-sm text-stone hover:text-amber hover:border-amber/40 transition-colors duration-200"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
