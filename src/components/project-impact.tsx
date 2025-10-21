"use client";

import { motion } from "framer-motion";

interface ImpactMetric {
  value: string;
  label: string;
  description: string;
}

interface ProjectImpactProps {
  impact: Record<string, ImpactMetric | undefined>;
}

export function ProjectImpact({ impact }: ProjectImpactProps) {
  const metrics = Object.values(impact).filter((m): m is ImpactMetric => m !== undefined);

  return (
    <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-2 gap-3">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          className="p-4 rounded-lg border bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-500/40 transition-colors"
        >
          <div className="text-xl sm:text-2xl font-bold text-green-400 font-mono leading-tight">
            {metric.value}
          </div>
          <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mt-2">
            {metric.label}
          </div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
            {metric.description}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
