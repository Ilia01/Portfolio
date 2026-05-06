"use client";

import { motion } from "framer-motion";
import { profileData } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,_rgba(212,160,84,0.07)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_rgba(30,27,24,0.8)_0%,_transparent_50%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-12 border border-amber/25 rounded-full bg-amber/5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-amber/60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
          </span>
          <span className="font-mono text-[11px] sm:text-xs text-amber/90 tracking-[0.15em] uppercase">
            {profileData.availability.label}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl text-cream mb-8 leading-[1.05] tracking-tight"
        >
          {profileData.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
          className="text-lg sm:text-xl text-stone max-w-xl mx-auto mb-14 leading-relaxed"
        >
          Backend engineer in {profileData.location.split(",")[0]}, building
          systems and shipping open-source tools with TypeScript and Node.js.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-12 max-w-xl mx-auto"
        >
          <span className="inline-flex items-center gap-3 font-mono text-[10px] text-amber/60 tracking-[0.25em] uppercase shrink-0">
            Now
            <span className="w-8 h-px bg-rule sm:hidden" />
          </span>
          <span className="hidden sm:block w-8 h-px bg-rule shrink-0" />
          <span className="text-sm text-ash leading-relaxed text-center sm:text-left">
            {profileData.currently}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.46, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-7 font-mono text-sm"
        >
          <a
            href={profileData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone hover:text-cream transition-colors duration-200"
          >
            GitHub
          </a>
          <span className="w-1 h-1 rounded-full bg-rule" />
          <a
            href={profileData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone hover:text-cream transition-colors duration-200"
          >
            LinkedIn
          </a>
          <span className="w-1 h-1 rounded-full bg-rule" />
          <a
            href={`mailto:${profileData.contact.email}`}
            className="text-amber hover:text-amber-light transition-colors duration-200"
          >
            Email
          </a>
          <span className="w-1 h-1 rounded-full bg-rule" />
          <a
            href={profileData.resumeUrl}
            download
            className="inline-flex items-center gap-1 text-stone hover:text-amber transition-colors duration-200"
          >
            Résumé
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-transparent via-amber/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
