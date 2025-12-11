"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

export function BlogNavigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        {/* Logo - links to home */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-zinc-900 dark:text-white">Ilia Goginashvili</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-zinc-900 dark:text-white font-medium"
            >
              Blog
            </Link>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
