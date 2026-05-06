"use client";

import { motion } from "framer-motion";

/**
 * Soft chapter break between sections.
 * A hairline that fades into a small amber pip, then fades back out.
 * Animates in via scroll for a smooth handoff between sections.
 */
export function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.4 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="flex items-center justify-center gap-4 py-3 sm:py-5"
      aria-hidden
    >
      <span className="h-px bg-gradient-to-r from-transparent via-rule to-rule w-20 sm:w-32" />
      <span className="relative flex items-center justify-center w-1.5 h-1.5">
        <span className="absolute inset-0 rounded-full bg-amber/30 blur-[2px]" />
        <span className="relative w-1 h-1 rounded-full bg-amber/70" />
      </span>
      <span className="h-px bg-gradient-to-l from-transparent via-rule to-rule w-20 sm:w-32" />
    </motion.div>
  );
}
