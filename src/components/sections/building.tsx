"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profileData } from "@/lib/data";
import { MprmahjongPreview } from "@/components/mprmahjong-preview";
import { ArrowUpRight } from "lucide-react";

export function Building() {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const f = profileData.flagship;

  return (
    <section
      id="building"
      className="relative w-full px-6 sm:px-10 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 border-b border-amber/25 pb-6"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber/80">
            Flagship
          </p>
          <h2 className="mt-3 text-balance text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-cream">
            Currently building
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="order-2 lg:order-1 lg:col-span-7"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber/80">
              {f.tagline}
            </p>
            <h3 className="mt-3 text-balance text-4xl sm:text-5xl font-medium tracking-[-0.025em] text-cream">
              {f.title}
            </h3>
            <p className="mt-6 max-w-[60ch] text-pretty text-base sm:text-lg leading-relaxed text-stone">
              {f.description}
            </p>

            <dl className="mt-10 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-10">
              <div className="border-l border-amber/50 pl-4">
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ash">
                  My role
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-cream">
                  {f.role}
                </dd>
              </div>
              <div className="border-l border-rule pl-4">
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ash">
                  Status
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-cream">
                  {f.status}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-1.5">
              {f.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-rule px-2.5 py-1 font-mono text-[11px] text-stone"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-10 border-t border-rule/60 pt-6">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ash">
                Surfaces I am rebuilding
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                {f.surfaces.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2.5 text-sm text-stone"
                  >
                    <span
                      aria-hidden
                      className="mt-[9px] h-px w-3 shrink-0 bg-rule"
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border-b border-amber/40 pb-1 font-mono text-sm text-amber transition-colors hover:border-amber-light hover:text-amber-light"
              >
                Visit mprmahjong.com
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="order-1 lg:order-2 lg:col-span-5"
          >
            <MprmahjongPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
