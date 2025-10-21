"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Project } from "@/lib/data";

interface CaseStudySectionProps {
  project: Project;
}

export function CaseStudySection({ project }: CaseStudySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Only show if project has features
  if (!project.features || project.features.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-md bg-zinc-100/50 dark:bg-zinc-800/50 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 border border-zinc-200 dark:border-zinc-800 transition-colors text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        <span className="font-mono">
          {isExpanded ? "Hide" : "Show"} Full Case Study
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-2">
              {/* Long Description */}
              {project.longDescription && (
                <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>
              )}

              {/* Features List */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-400 uppercase">
                  Key Features
                </h4>
                <div className="grid gap-2">
                  {project.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Badges */}
              {project.badges && project.badges.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-400 uppercase">
                    Status
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.badges.map((badge, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1.5 text-xs rounded-md font-mono border ${
                          badge.type === "success"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
