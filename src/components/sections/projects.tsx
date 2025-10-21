"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, TrendingUp } from "lucide-react";
import { profileData, Project } from "@/lib/data";
import { ProjectImpact } from "@/components/project-impact";
import { CaseStudySection } from "@/components/case-study-section";
import { GitHubStats } from "@/components/github-stats";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group h-full flex flex-col rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur p-4 sm:p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-xl"
    >
      <div className="flex-1 space-y-6">
        {/* Header with Featured Badge */}
        <div className="space-y-2">
          {project.featured && (
            <div className="inline-flex px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400 font-mono mb-2">
              ⭐ Featured
            </div>
          )}
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-green-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-mono">{project.subtitle}</p>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.highlights.map((highlight, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded-md bg-green-500/10 text-green-400 border border-green-500/20 font-mono"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* GitHub Stats */}
        {project.github && <GitHubStats githubUrl={project.github} />}

        {/* Problem-Action-Result */}
        {project.problem && (
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-red-400 font-mono text-xs font-semibold">Problem:</span>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <span className="text-blue-400 font-mono text-xs font-semibold">Solution:</span>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">{project.action}</p>
            </div>
            <div>
              <span className="text-green-400 font-mono text-xs font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Impact:
              </span>
              <p className="text-zinc-700 dark:text-zinc-300 mt-1.5 font-medium leading-relaxed">{project.result}</p>
            </div>
          </div>
        )}

        {/* Impact Metrics */}
        {project.impact && <ProjectImpact impact={project.impact} />}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 6).map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1.5 text-xs rounded-md bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 font-mono border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 6 && (
            <span className="px-2.5 py-1.5 text-xs rounded-md bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 font-mono border border-zinc-200 dark:border-zinc-800">
              +{project.technologies.length - 6} more
            </span>
          )}
        </div>

        {/* Case Study Section */}
        {project.featured && <CaseStudySection project={project} />}

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white text-sm font-medium min-h-[44px]"
            >
              <Github className="w-4 h-4" />
              <span>View Code</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 transition-colors text-green-400 hover:text-green-300 text-sm font-medium min-h-[44px]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique categories
  const categories = ["all", ...new Set(profileData.projects.map((p) => p.category))];

  // Filter projects by category
  const filteredProjects = selectedCategory === "all"
    ? profileData.projects
    : profileData.projects.filter((p) => p.category === selectedCategory);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-16 sm:py-20 px-4">
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
              ls -l ./projects
            </h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 font-mono text-sm sm:text-base">
            Building production-ready systems and developer tools
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-wrap gap-3"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md text-sm font-mono transition-all ${
                selectedCategory === category
                  ? "bg-green-500/20 text-green-400 border border-green-500/40"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-base sm:text-lg font-mono text-zinc-600 dark:text-zinc-400 mb-6">
              Featured Projects
            </h3>
            <div className="grid lg:grid-cols-2 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-base sm:text-lg font-mono text-zinc-600 dark:text-zinc-400 mb-6">
              Other Projects
            </h3>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + featuredProjects.length}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
