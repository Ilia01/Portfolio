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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-3">
            About Me
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            My philosophy and approach to software development
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-8">
          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur p-4 sm:p-6 md:p-8"
          >
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              My Philosophy
            </h3>
            <div className="space-y-3">
              {profileData.about.philosophy.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400"
                >
                  <span className="text-green-500 mt-1">•</span>
                  <span>{principle}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* What I'm Looking For - prominent placement for recruiters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-lg border border-green-500/20 bg-green-500/5 dark:bg-green-500/10 p-4 sm:p-6"
          >
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              What I&apos;m Looking For
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1.5 text-sm font-medium text-green-700 dark:text-green-300 bg-green-500/10 dark:bg-green-500/20 rounded-full">
                {profileData.lookingFor.role}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {profileData.lookingFor.focus.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
            <ul className="space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
              {profileData.lookingFor.preferences.map((pref, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-green-500">→</span>
                  {pref}
                </li>
              ))}
            </ul>
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
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">Focus Areas</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {profileData.about.focus}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur p-6">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">Approach</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
