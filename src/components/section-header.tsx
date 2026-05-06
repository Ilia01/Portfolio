"use client";

import { motion } from "framer-motion";

type Props = Readonly<{
  index?: string;
  kicker: string;
  title: string;
  lede?: string;
  compact?: boolean;
}>;

export function SectionHeader({
  index,
  kicker,
  title,
  lede,
  compact = false,
}: Props) {
  const titleClass = compact
    ? "font-serif text-2xl sm:text-3xl md:text-4xl text-cream leading-[1.1]"
    : "font-serif text-3xl sm:text-5xl md:text-6xl text-cream leading-[1.05] mb-5";

  const wrapperClass = compact
    ? "text-center mb-14 sm:mb-16"
    : "text-center mb-12 sm:mb-16";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.5 }}
      className={wrapperClass}
    >
      <div className="inline-flex items-center gap-3 mb-4 font-mono text-[11px] text-amber/70 uppercase tracking-[0.25em]">
        {index && (
          <>
            <span className="text-amber/50 tabular-nums">§ {index}</span>
            <span className="w-3 h-px bg-amber/30" />
          </>
        )}
        <span>{kicker}</span>
      </div>
      <h2 className={titleClass}>{title}</h2>
      {lede && !compact && (
        <p className="font-serif italic text-stone text-base sm:text-lg max-w-md mx-auto leading-relaxed">
          {lede}
        </p>
      )}
    </motion.div>
  );
}
