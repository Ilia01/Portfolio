"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profileData } from "@/lib/data";

export function About() {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const { primary, tools, also } = profileData.stack;

  return (
    <section
      id="about"
      className="relative w-full px-6 sm:px-10 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 flex items-start gap-5"
        >
          <span
            aria-hidden
            className="mt-2 block h-12 w-px bg-amber"
          />
          <div>
            <h2 className="text-balance text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-cream">
              About
            </h2>
            <p className="mt-2 text-sm text-stone">How I work and where I fit in.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-7"
          >
            <div className="space-y-6 text-pretty text-base sm:text-lg leading-relaxed text-stone">
              {profileData.about.map((p, i) => (
                <p key={i} className="max-w-[62ch]">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="lg:col-span-5"
          >
            <div className="space-y-8 rounded-2xl border border-rule/70 bg-paper/40 p-7 sm:p-9">
              <AvailabilityBlock />
              <div className="h-px w-full bg-rule/60" />
              <StackBlock label="Reach for first" items={primary} accent />
              <StackBlock label="Tools" items={tools} />
              <StackBlock label="Also comfortable in" items={also} />
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function AvailabilityBlock() {
  return (
    <div>
      <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ash">
        Availability
      </p>
      <dl className="mt-4 space-y-3 text-sm">
        <Row label="Based in" value="Tbilisi, GMT+4" />
        <Row label="Reply within" value="A day on weekdays" />
        <Row label="Engagements" value="3 to 12 weeks, scoped" />
        <Row label="Status" value="Open to full-time and freelance" accent />
      </dl>
    </div>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="shrink-0 font-mono text-[11px] text-ash">{label}</dt>
      <dd
        className={`text-right text-sm ${
          accent ? "text-amber" : "text-cream"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function StackBlock({
  label,
  items,
  accent,
}: {
  label: string;
  items: readonly string[];
  accent?: boolean;
}) {
  return (
    <div>
      <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ash">
        {label}
      </p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className={`rounded-full border px-2.5 py-1 font-mono text-[11px] ${
              accent
                ? "border-amber/30 bg-amber/[0.05] text-amber/90"
                : "border-rule text-stone"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
