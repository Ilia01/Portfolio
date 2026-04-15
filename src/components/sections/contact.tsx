"use client";

import { motion } from "framer-motion";
import { profileData } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto"
        >
          <h2 className="font-serif text-4xl sm:text-5xl text-cream mb-6">
            Get in touch
          </h2>
          <p className="text-stone leading-relaxed mb-10">
            Open to work, collaboration, and interesting problems.
          </p>
          <a
            href={`mailto:${profileData.contact.email}`}
            className="inline-block font-mono text-sm text-amber border border-amber/40 px-8 py-3 rounded hover:bg-amber/10 hover:border-amber/60 transition-all duration-200"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
