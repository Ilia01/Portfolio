"use client";

import { motion } from "framer-motion";
import { profileData } from "@/lib/data";

function SkillBar({ name, proficiency }: { name: string; proficiency: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-zinc-700 dark:text-zinc-300 font-mono">{name}</span>
        <span className="text-xs text-zinc-600 dark:text-zinc-400">{proficiency}%</span>
      </div>
      <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
        />
      </div>
    </div>
  );
}

function SkillCategory({
  title,
  skills,
  delay = 0,
}: {
  title: string;
  skills: Array<{ name: string; proficiency: number }>;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="space-y-4"
    >
      <h3 className="text-lg font-mono text-green-400">{title}</h3>
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <SkillBar key={index} name={skill.name} proficiency={skill.proficiency} />
        ))}
      </div>
    </motion.div>
  );
}

function SkillTag({ name }: { name: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="px-3 py-2 text-sm rounded-md bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 font-mono border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-default"
    >
      {name}
    </motion.span>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-20 px-4 bg-zinc-50 dark:bg-zinc-950/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-green-400 font-mono text-xl">$</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
              cat tech-stack.txt
            </h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 font-mono text-sm sm:text-base">
            Production-ready tech for backend systems
          </p>
        </motion.div>

        {/* Skill Bars */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12">
          <SkillCategory
            title="Languages"
            skills={profileData.skills.languages}
            delay={0}
          />
          <SkillCategory
            title="Backend Frameworks"
            skills={profileData.skills.backend}
            delay={0.1}
          />
          <SkillCategory
            title="Data & Databases"
            skills={profileData.skills.data}
            delay={0.2}
          />
          <SkillCategory
            title="Frontend"
            skills={profileData.skills.frontend}
            delay={0.3}
          />
        </div>

        {/* Infrastructure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-4 mb-8"
        >
          <h3 className="text-lg font-mono text-green-400">Infrastructure & DevOps</h3>
          <div className="flex flex-wrap gap-3">
            {profileData.skills.infrastructure.map((skill, index) => (
              <SkillBar
                key={index}
                name={skill.name}
                proficiency={skill.proficiency}
              />
            ))}
          </div>
        </motion.div>

        {/* Operations Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-mono text-green-400">
            Operations & Best Practices
          </h3>
          <div className="flex flex-wrap gap-3">
            {profileData.skills.operations.map((skill, index) => (
              <SkillTag key={index} name={skill} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
