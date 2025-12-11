"use client";

import { motion } from "framer-motion";
import { profileData } from "@/lib/data";

type SkillLevel = "expert" | "proficient" | "familiar";

const levelColors: Record<SkillLevel, { bg: string; text: string; border: string }> = {
  expert: {
    bg: "bg-green-500/10",
    text: "text-green-500",
    border: "border-green-500/20",
  },
  proficient: {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    border: "border-blue-500/20",
  },
  familiar: {
    bg: "bg-zinc-500/10",
    text: "text-zinc-500",
    border: "border-zinc-500/20",
  },
};

const levelLabels: Record<SkillLevel, string> = {
  expert: "Expert",
  proficient: "Proficient",
  familiar: "Familiar",
};

function SkillPill({ name, level }: { name: string; level: SkillLevel }) {
  const colors = levelColors[level];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700"
    >
      <span className="text-sm text-zinc-900 dark:text-white font-medium">{name}</span>
      <span
        className={`px-2 py-0.5 text-xs rounded-full ${colors.bg} ${colors.text} ${colors.border} border`}
      >
        {levelLabels[level]}
      </span>
    </motion.div>
  );
}

function SkillCategory({
  title,
  skills,
  delay = 0,
}: {
  title: string;
  skills: Array<{ name: string; level: SkillLevel }>;
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
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <SkillPill key={index} name={skill.name} level={skill.level} />
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
      className="px-3 py-2 text-sm rounded-md bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-default"
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-3">
            Technical Skills
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Production-ready technologies for backend systems
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4">
            {(["expert", "proficient", "familiar"] as const).map((level) => (
              <div key={level} className="flex items-center gap-2 text-xs text-zinc-500">
                <span
                  className={`w-2 h-2 rounded-full ${levelColors[level].bg} ${levelColors[level].border} border`}
                />
                <span>{levelLabels[level]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 gap-8 mb-12">
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
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Infrastructure & DevOps
          </h3>
          <div className="flex flex-wrap gap-3">
            {profileData.skills.infrastructure.map((skill, index) => (
              <SkillPill key={index} name={skill.name} level={skill.level} />
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
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
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
