"use client";

import { motion } from "framer-motion";
import { profileData } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="py-16 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-green-400 font-mono text-xl">$</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
              tail -f goals.log
            </h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 font-mono text-sm sm:text-base">
            Philosophy and approach to software development
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-8">
          {/* Terminal-style About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur p-4 sm:p-6 md:p-8"
          >
            <div className="font-mono text-sm space-y-4">
              <div className="text-zinc-500 dark:text-zinc-400">$ cat philosophy.txt</div>

              <div className="space-y-3 text-zinc-600 dark:text-zinc-400">
                {profileData.about.philosophy.map((principle, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-green-500 mt-1">▹</span>
                    <span>{principle}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="pt-4 border-t border-zinc-200 dark:border-zinc-800"
              >
                <div className="text-zinc-600 dark:text-zinc-400 italic">
                  <span className="text-green-500">&gt;</span>{" "}
                  {profileData.about.tagline}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur p-6">
              <h3 className="text-lg font-mono text-green-400 mb-3">Focus Areas</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {profileData.about.focus}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur p-6">
              <h3 className="text-lg font-mono text-green-400 mb-3">Approach</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Building production-ready backends with emphasis on correctness,
                security, and comprehensive documentation. Every project is an
                opportunity to demonstrate clean architecture and engineering
                excellence.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
