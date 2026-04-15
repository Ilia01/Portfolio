"use client";

import { motion } from "framer-motion";
import { profileData } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-cream">
            Experience
          </h2>
        </motion.div>

        <div>
          {profileData.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-t border-rule pt-10 pb-10"
            >
              <div className="grid sm:grid-cols-[1fr_auto] gap-4 sm:gap-12 mb-5">
                <div>
                  <h3 className="font-serif text-2xl text-cream">{exp.role}</h3>
                  <p className="text-amber text-sm mt-1.5 font-medium">
                    {exp.company}
                  </p>
                </div>
                <p className="font-mono text-xs text-ash tracking-wide self-start pt-2">
                  {exp.period} / {exp.location}
                </p>
              </div>

              <p className="text-cream/80 leading-relaxed max-w-2xl mb-6">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs text-stone px-2.5 py-1 border border-rule rounded bg-raised/50"
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
