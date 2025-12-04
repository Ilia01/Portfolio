"use client";

import { motion } from "framer-motion";
import { Download, Mail, Calendar } from "lucide-react";
import { profileData } from "@/lib/data";

export function HireMeBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 animate-gradient" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 to-zinc-950/80 backdrop-blur-sm" />

          {/* Content */}
          <div className="relative p-6 sm:p-8 md:p-12 text-center space-y-6">
            {/* Status Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30"
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 font-mono text-sm font-medium">
                Available for Hire
              </span>
            </motion.div>

            {/* Headline */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-3">
                Looking for a Backend Engineer Who Leads
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
                Currently leading a Node.js team at Andersen. I build backends, review code,
                make architecture decisions, and occasionally write blog posts about what I learn.
                Based in T&apos;bilisi, Georgia.
              </p>
            </div>

            {/* Key Points */}
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
              <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                <div className="text-green-400 font-mono text-sm mb-1">Current Role</div>
                <div className="text-zinc-700 dark:text-zinc-300 text-sm">Node.js Team Lead at Andersen</div>
              </div>
              <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                <div className="text-green-400 font-mono text-sm mb-1">Focus</div>
                <div className="text-zinc-700 dark:text-zinc-300 text-sm">Backend systems, team leadership, code reviews</div>
              </div>
              <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                <div className="text-green-400 font-mono text-sm mb-1">Location</div>
                <div className="text-zinc-700 dark:text-zinc-300 text-sm">T&apos;bilisi, Georgia · Open to remote</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a
                href={`mailto:${profileData.contact.email}`}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
              >
                <Mail className="w-5 h-5" />
                <span>Get in Touch</span>
              </a>

              <button
                onClick={() => {
                  // TODO: Add resume download functionality
                  alert("Resume download coming soon!");
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-medium transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </button>

              <button
                onClick={() => {
                  window.open(profileData.contact.linkedin, "_blank");
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-medium transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                <Calendar className="w-5 h-5" />
                <span>View LinkedIn</span>
              </button>
            </div>

            {/* Bottom Note */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-mono pt-4">
              Response time: Usually within 24 hours
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
