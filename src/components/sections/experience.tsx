"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profileData } from "@/lib/data";

export function Experience() {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="experience"
      className="relative w-full px-6 sm:px-10 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="mb-16 text-balance text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-cream"
        >
          Experience.
        </motion.h2>

        <ol className="relative space-y-12 border-l border-rule/60 pl-6 sm:pl-10">
          {profileData.experience.map((role, i) => (
            <motion.li
              key={`${role.company}-${i}`}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease }}
              className="relative"
            >
              <span className="absolute -left-[33px] sm:-left-[45px] top-2 h-2 w-2 rounded-full bg-amber" />

              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl sm:text-2xl font-medium tracking-[-0.02em] text-cream">
                  {role.role}
                  <span className="ml-3 text-stone">at {role.company}</span>
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
                  {role.period}
                </p>
              </div>

              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
                {role.location}
              </p>

              <p className="mt-5 max-w-[65ch] text-pretty text-base leading-relaxed text-stone">
                {role.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {role.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-rule px-2.5 py-1 font-mono text-[10.5px] text-stone"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.li>
          ))}

          <motion.li
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
            className="relative"
          >
            <span className="absolute -left-[33px] sm:-left-[45px] top-2 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber/60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
            </span>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-xl sm:text-2xl font-medium tracking-[-0.02em] text-cream">
                Freelance and open source
                <span className="ml-3 text-stone">independent</span>
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
                Jan 2026 to present
              </p>
            </div>
            <p className="mt-5 max-w-[65ch] text-pretty text-base leading-relaxed text-stone">
              Building client work, shipping CLIs to npm, and rebuilding
              mprmahjong.com end-to-end. Available for new full-time and
              freelance opportunities.
            </p>
          </motion.li>
        </ol>
      </div>
    </section>
  );
}
