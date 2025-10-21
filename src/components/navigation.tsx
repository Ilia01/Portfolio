"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-green-400 font-mono text-lg">$</span>
          <span className="font-mono font-bold text-zinc-900 dark:text-white">Ilia</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 font-mono text-sm">
            <button
              onClick={() => scrollToSection("projects")}
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              projects
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              skills
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              about
            </button>
            <Link
              href="/blog"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              blog
            </Link>
            {/* Lab feature - hidden in production, available at /lab */}
            {/* <Link
              href="/lab"
              className="text-zinc-600 dark:text-zinc-400 hover:text-green-400 dark:hover:text-green-400 transition-colors"
            >
              lab
            </Link> */}
            <button
              onClick={() => scrollToSection("contact")}
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              contact
            </button>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
