"use client";

import { motion } from "framer-motion";
import { Mail, FileText, ArrowRight } from "lucide-react";
import { profileData } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
    >
      {/* Background - Light and Dark modes */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500/5 dark:from-green-900/10 via-transparent to-transparent -z-10" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-4xl mx-auto w-full text-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400" />
            Open to opportunities
          </span>
        </motion.div>

        {/* Name with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent"
        >
          {profileData.name}
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 font-medium mb-6"
        >
          Backend Developer (Trainee) at Andersen
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Finishing my degree while working on a Node.js team.
          Currently handling most of Tech Lead&apos;s responsibilities in his absence.
          I build auth systems and security-focused APIs in my own time to learn the fundamentals properly.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <a
            href="#contact"
            className="group px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-green-500/20"
          >
            <Mail className="w-4 h-4" />
            Contact Me
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="/resume-ilia-goginashvili.pdf"
            download="Ilia_Goginashvili_Resume.pdf"
            className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-medium rounded-lg transition-all flex items-center gap-2 border border-zinc-200 dark:border-zinc-700"
          >
            <FileText className="w-4 h-4" />
            View Resume
          </a>
        </motion.div>

        {/* Tech stack hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {["TypeScript", "Node.js", "NestJS", "PostgreSQL", "Redis"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs text-zinc-600 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
