"use client";

import { motion } from "framer-motion";
import { profileData } from "@/lib/data";
import { SectionHeader } from "@/components/section-header";

export function About() {
  const dailyStack = [
    "TypeScript",
    "Node",
    "NestJS",
    "PostgreSQL",
    "Docker",
    "Redis",
    "GitHub Actions",
    "Prisma",
  ];

  return (
    <section
      id="about"
      className="py-28 sm:py-36 px-6 relative scroll-mt-20"
    >
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          index="01"
          kicker="About"
          title="Briefly."
          lede="A short note on what I do, what I'm chasing, and where to find me."
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-cream/85 leading-[1.85] text-base sm:text-lg max-w-xl mx-auto text-center mb-14"
        >
          {profileData.about[0]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="h-px bg-rule mx-auto mb-12 max-w-[280px]"
          aria-hidden
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-6 sm:gap-10 items-center mb-14"
        >
          <Callout label="Open for" alignment="right">
            Full-time roles and freelance work.
          </Callout>
          <span className="hidden sm:block w-px h-12 bg-rule" aria-hidden />
          <Callout label="Learning" alignment="left">
            Rust and low-level programming.
          </Callout>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="font-serif italic text-amber/70 text-sm mb-3">
            Daily stack
          </p>
          <p className="font-mono text-xs sm:text-sm text-stone leading-relaxed max-w-xl mx-auto">
            {dailyStack.join("  ·  ")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Callout({
  label,
  children,
  alignment,
}: Readonly<{
  label: string;
  children: React.ReactNode;
  alignment: "left" | "right";
}>) {
  const alignClass = alignment === "right" ? "sm:text-right" : "sm:text-left";
  return (
    <div className={`text-center ${alignClass}`}>
      <p className="font-mono text-[10px] text-amber/70 uppercase tracking-[0.25em] mb-2">
        {label}
      </p>
      <p className="text-cream/90 leading-relaxed">{children}</p>
    </div>
  );
}
