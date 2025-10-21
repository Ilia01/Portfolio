"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { profileData } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
            <span className="text-green-400">$</span> Built with Next.js, TypeScript, and
            Tailwind CSS
          </div>

          <div className="flex items-center gap-4">
            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${profileData.contact.email}`}
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-500 font-mono">
          © {new Date().getFullYear()} {profileData.name}. Tools minimal. Docs automated. Code
          speaks.
        </div>
      </div>
    </footer>
  );
}
