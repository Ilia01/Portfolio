"use client";

import { motion } from "framer-motion";
import { profileData } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-cream mb-3">
            Get in touch
          </h2>
          <div className="w-10 h-px bg-amber/50 mb-4" />
          <p className="text-stone">
            Open to work, collaboration, and interesting problems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-rule pt-12"
        >
          <div>
            <h3 className="font-mono text-xs text-ash uppercase tracking-[0.2em] mb-3">
              Email
            </h3>
            <a
              href={`mailto:${profileData.contact.email}`}
              className="text-amber hover:text-amber-light transition-colors duration-200 text-sm break-all leading-relaxed"
            >
              {profileData.contact.email}
            </a>
          </div>

          <div>
            <h3 className="font-mono text-xs text-ash uppercase tracking-[0.2em] mb-3">
              GitHub
            </h3>
            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-cream/80 hover:text-cream transition-colors duration-200 text-sm"
            >
              Ilia01
              <ArrowUpRight className="w-3.5 h-3.5 text-ash" />
            </a>
          </div>

          <div>
            <h3 className="font-mono text-xs text-ash uppercase tracking-[0.2em] mb-3">
              LinkedIn
            </h3>
            <a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-cream/80 hover:text-cream transition-colors duration-200 text-sm"
            >
              Ilia Goginashvili
              <ArrowUpRight className="w-3.5 h-3.5 text-ash" />
            </a>
          </div>

          <div>
            <h3 className="font-mono text-xs text-ash uppercase tracking-[0.2em] mb-3">
              Location
            </h3>
            <p className="text-cream/80 text-sm">{profileData.location}</p>
            <p className="text-stone text-sm mt-1">
              {profileData.availability}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
