"use client";

import { motion } from "framer-motion";
import { profileData } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-cream mb-3">
            About
          </h2>
          <div className="w-10 h-px bg-amber/50" />
        </motion.div>

        <div className="grid md:grid-cols-[3fr_2fr] gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            {profileData.about.map((paragraph, index) => (
              <p key={index} className="text-cream/80 leading-[1.8]">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-mono text-xs text-amber/70 uppercase tracking-[0.2em] mb-4">
                Primary
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileData.stack.primary.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-sm text-cream px-3 py-1.5 border border-amber/20 rounded bg-raised"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs text-ash uppercase tracking-[0.2em] mb-4">
                Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileData.stack.tools.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-sm text-stone px-3 py-1.5 border border-rule rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs text-ash uppercase tracking-[0.2em] mb-4">
                Also
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileData.stack.also.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-sm text-ash px-3 py-1.5 border border-rule/60 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
