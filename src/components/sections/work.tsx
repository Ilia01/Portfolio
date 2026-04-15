"use client";

import { motion } from "framer-motion";
import { profileData } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export function Work() {
  return (
    <section id="work" className="py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-cream mb-3">
            Work
          </h2>
          <div className="w-10 h-px bg-amber/50 mb-4" />
          <p className="text-stone text-sm">
            Shipped tools with docs, tests, CI, and release workflows.
          </p>
        </motion.div>

        <div>
          {profileData.projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group border-t border-rule py-10 sm:py-14"
            >
              <div className="grid sm:grid-cols-[1fr_auto] gap-6 sm:gap-16 items-start">
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl sm:text-3xl text-cream group-hover:text-amber transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-cream/80 leading-relaxed max-w-xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs text-stone px-2.5 py-1 border border-rule rounded bg-raised/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-col gap-4 font-mono text-sm pt-1">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-stone hover:text-amber transition-colors duration-200"
                    >
                      Code
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {"npm" in project.links && project.links.npm && (
                    <a
                      href={project.links.npm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-stone hover:text-amber transition-colors duration-200"
                    >
                      npm
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {"docs" in project.links && project.links.docs && (
                    <a
                      href={project.links.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-stone hover:text-amber transition-colors duration-200"
                    >
                      Docs
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
          <div className="border-t border-rule" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <a
            href={profileData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-stone hover:text-amber transition-colors duration-200"
          >
            More on GitHub
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
