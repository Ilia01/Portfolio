"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, ArrowUp } from "lucide-react";
import { profileData } from "@/lib/data";

export function SideRails() {
  const [pastHero, setPastHero] = useState(false);
  const ticking = useRef(false);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Left rail: social icons */}
      <AnimatePresence>
        {pastHero && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed left-8 lg:left-12 bottom-0 z-40 hidden md:flex flex-col items-center gap-5"
          >
            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ash hover:text-amber transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="w-[18px] h-[18px]" />
            </a>
            <a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ash hover:text-amber transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-[18px] h-[18px]" />
            </a>
            <div className="w-px h-24 bg-rule" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right rail: email vertical + back-to-top arrow */}
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

      {/* Mobile: back-to-top arrow only */}
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
