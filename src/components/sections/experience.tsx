"use client";

import { motion } from "framer-motion";
import { profileData } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20 px-4 relative z-0">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-3">
            Experience
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Professional experience and team leadership
          </p>
        </motion.div>

        <div className="space-y-6">
          {profileData.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <a
                    href="https://andersenlab.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-400 transition-colors inline-flex items-center gap-1"
                  >
                    {exp.company}
                    <span className="text-xs">↗</span>
                  </a>
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 md:mt-0">
                  {exp.period} · {exp.location}
                </div>
              </div>

              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                {exp.highlights.map((highlight, hIndex) => (
                  <motion.div
                    key={hIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + hIndex * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-green-500 mt-1">▹</span>
                    <span>{highlight}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, tIndex) => (
                  <span
                    key={tIndex}
                    className="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-500 border border-green-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
