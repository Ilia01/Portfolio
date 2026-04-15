"use client";

import { motion } from "framer-motion";
import { profileData } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Layered warm glow: creates depth and draws the eye inward */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,_rgba(212,160,84,0.07)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_rgba(30,27,24,0.8)_0%,_transparent_50%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto w-full text-center relative z-10">
        {/* Role + location: establishes context immediately */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-mono text-xs sm:text-sm text-ash tracking-[0.2em] uppercase mb-8"
        >
          {profileData.role}
          <span className="inline-block mx-3 text-rule">&#8212;</span>
          {profileData.location}
        </motion.p>

        {/* Name: the centerpiece. Serif at large scale signals authority */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl text-cream mb-8 leading-[1.05] tracking-tight"
        >
          {profileData.name}
        </motion.h1>

        {/* Tagline: clear, readable, not trying too hard */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="text-lg sm:text-xl text-stone max-w-lg mx-auto mb-12 leading-relaxed"
        >
          I build backend systems and ship open-source tools
          <br className="hidden sm:block" />
          with TypeScript and Node.js.
        </motion.p>

        {/* Links: subtle but accessible. Amber on the email to guide action */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="flex items-center justify-center gap-6 sm:gap-8 font-mono text-sm"
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
        </motion.div>
      </div>

      {/* Scroll indicator: gentle pulse, not distracting */}
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
