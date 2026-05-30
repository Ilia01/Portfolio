"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profileData } from "@/lib/data";
import { MprmahjongPreview } from "@/components/mprmahjong-preview";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full overflow-hidden px-6 sm:px-10 pt-28 pb-16 lg:pt-24 lg:pb-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_30%_25%,_rgba(212,160,84,0.06)_0%,_transparent_65%)]" />

      <div className="relative mx-auto grid h-full w-full max-w-[1400px] grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7 xl:col-span-7">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-amber/25 bg-amber/[0.04] px-3.5 py-1.5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber/60 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber/90">
              {profileData.availability.label}
            </span>
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-8 text-balance font-sans text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-cream"
          >
            Full-stack developer.
            <br />
            <span className="text-stone">Shipping product end-to-end.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="mt-7 max-w-[58ch] text-pretty text-base sm:text-lg leading-relaxed text-stone"
          >
            {profileData.intro}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href={`mailto:${profileData.contact.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 font-mono text-sm font-medium text-ink transition-all hover:bg-amber-light active:scale-[0.98]"
            >
              Start a conversation
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-rule px-5 py-2.5 font-mono text-sm text-cream transition-all hover:border-stone hover:bg-paper/60 active:scale-[0.98]"
            >
              GitHub
            </a>
            <a
              href={profileData.resumeUrl}
              download
              className="inline-flex items-center gap-1.5 px-2 py-2.5 font-mono text-sm text-ash transition-colors hover:text-cream"
            >
              Résumé
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </motion.div>

        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="lg:col-span-5 xl:col-span-5"
        >
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <MprmahjongPreview compact />
            <div className="mt-4 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
              <span>Currently building</span>
              <a
                href="#building"
                className="text-stone transition-colors hover:text-cream"
              >
                Read more
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
