"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profileData, type Project } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { ProjectMark, type ProjectMarkId } from "@/components/project-mark";

const EYEBROW: Record<string, string> = {
  hooklens: "Open source CLI",
  devflow: "Developer tooling",
  beacon: "Desktop overlay",
};

export function Work() {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const projects = profileData.projects;

  return (
    <section
      id="work"
      className="relative w-full px-6 sm:px-10 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 flex items-end gap-5 sm:gap-8 border-b border-rule/60 pb-6"
        >
          <span className="font-mono text-4xl sm:text-5xl leading-none tabular-nums text-rule">
            02
          </span>
          <div className="flex flex-1 items-end justify-between gap-4">
            <h2 className="text-balance text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-cream">
              Selected work
            </h2>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-ash sm:inline">
              Open source and side projects
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-6 lg:grid-cols-12">
          <ProjectCard project={projects[0]} variant="feature" />
          <ProjectCard project={projects[1]} variant="medium" />
          <ProjectCard project={projects[2]} variant="medium" />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  variant,
}: {
  project: Project;
  variant: "feature" | "medium";
}) {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const cardRef = useRef<HTMLElement>(null);

  const colSpan =
    variant === "feature"
      ? "md:col-span-6 lg:col-span-7 lg:row-span-2"
      : "md:col-span-3 lg:col-span-5";

  const links = Object.entries(project.links).filter(([, v]) => v) as Array<
    [string, string]
  >;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const radius = variant === "feature" ? 320 : 240;

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease }}
      style={{
        ["--mx" as string]: "50%",
        ["--my" as string]: "50%",
      }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-rule/70 bg-paper/40 p-7 sm:p-9 transition-colors hover:border-stone/40 ${colSpan}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at var(--mx) var(--my), rgba(212,160,84,0.55), transparent 55%)`,
          padding: "1px",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
        }}
      />

      {variant === "feature" && (
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber/[0.06] blur-3xl" />
      )}

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
            {EYEBROW[project.id] ?? "Project"}
          </p>
          <h3
            className={`mt-2 font-medium tracking-[-0.02em] text-cream ${
              variant === "feature" ? "text-3xl sm:text-4xl" : "text-2xl"
            }`}
          >
            {project.title}
          </h3>
        </div>
        <ProjectMark
          id={project.id as ProjectMarkId}
          className="shrink-0 text-stone/45 transition-colors duration-300 group-hover:text-amber/80"
        />
      </div>

      <p
        className={`relative mt-5 text-pretty leading-relaxed text-stone ${
          variant === "feature" ? "max-w-[58ch] text-base" : "text-sm"
        }`}
      >
        {project.description}
      </p>

      <div className="relative mt-auto pt-8">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="rounded-full border border-rule px-2.5 py-1 font-mono text-[10.5px] text-stone"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-rule/60 pt-5">
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs">
            {links.map(([label, url]) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-stone transition-colors hover:text-amber"
              >
                {label === "github"
                  ? "GitHub"
                  : label === "npm"
                  ? "npm"
                  : "Docs"}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
          </div>
          <ArrowUpRight className="h-4 w-4 text-ash transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber" />
        </div>
      </div>
    </motion.article>
  );
}
