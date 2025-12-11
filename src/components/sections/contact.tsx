"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ExternalLink, ArrowRight } from "lucide-react";
import { profileData } from "@/lib/data";
import { ContactPanel } from "@/components/contact-panel";

export function Contact() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <>
      <section id="contact" className="py-16 sm:py-20 px-4 bg-zinc-50 dark:bg-zinc-950/30">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-3">
              Get in Touch
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Have a question or want to work together?
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-4"
          >
            {/* Email - Opens contact panel */}
            <motion.button
              onClick={() => setIsPanelOpen(true)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full flex items-center gap-4 p-4 rounded-lg bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 hover:border-green-500 dark:hover:border-green-500 transition-all group text-left"
            >
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <Mail className="w-6 h-6 text-green-500" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-zinc-500">Send a message</div>
                <div className="text-zinc-900 dark:text-white font-medium group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  Contact Form
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
            </motion.button>

            {/* LinkedIn */}
            <motion.a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center gap-4 p-4 rounded-lg bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Linkedin className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-zinc-500">LinkedIn</div>
                <div className="text-zinc-900 dark:text-white font-medium">
                  Ilia Goginashvili
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
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
              className="flex items-center gap-4 p-4 rounded-lg bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-zinc-500/10 flex items-center justify-center">
                <Github className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-zinc-500">GitHub</div>
                <div className="text-zinc-900 dark:text-white font-medium">
                  @Ilia01
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <ContactPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </>
  );
}
