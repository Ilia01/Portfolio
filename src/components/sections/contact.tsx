"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileText, ExternalLink } from "lucide-react";
import { profileData } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20 px-4 bg-zinc-50 dark:bg-zinc-950/30">
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
              ./connect.sh
            </h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 font-mono text-sm sm:text-base">
            Get in touch for collaboration or opportunities
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur p-4 sm:p-6 md:p-8"
        >
          <div className="space-y-6">
            {/* Email */}
            <motion.a
              href={`mailto:${profileData.contact.email}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-4 p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-900/50 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-800 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700 flex items-center justify-center transition-colors">
                <Mail className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-zinc-600 dark:text-zinc-400 font-mono">Email</div>
                <div className="text-zinc-700 dark:text-zinc-300 font-mono text-sm md:text-base">
                  {profileData.contact.email}
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors" />
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center gap-4 p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-900/50 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-800 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700 flex items-center justify-center transition-colors">
                <Linkedin className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-zinc-600 dark:text-zinc-400 font-mono">LinkedIn</div>
                <div className="text-zinc-700 dark:text-zinc-300 font-mono text-sm">
                  linkedin.com/in/ilia-goginashvili-066689305
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors" />
            </motion.a>

            {/* GitHub */}
            <motion.a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center gap-4 p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-900/50 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-800 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700 flex items-center justify-center transition-colors">
                <Github className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-zinc-600 dark:text-zinc-400 font-mono">GitHub</div>
                <div className="text-zinc-700 dark:text-zinc-300 font-mono text-sm">github.com/Ilia01</div>
              </div>
              <ExternalLink className="w-5 h-5 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors" />
            </motion.a>

            {/* CV */}
            {profileData.contact.cvAvailable && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center gap-4 p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
              >
                <div className="w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 font-mono">CV / Resume</div>
                  <div className="text-zinc-600 dark:text-zinc-400 font-mono text-sm">
                    Available on request
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center"
          >
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-mono">
              Open to backend engineering roles and interesting projects
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
