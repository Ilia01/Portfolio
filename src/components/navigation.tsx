"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  const navLinks = [
    { id: "experience", label: "experience" },
    { id: "projects", label: "projects" },
    { id: "skills", label: "skills" },
    { id: "about", label: "about" },
    { id: "contact", label: "contact" },
  ];

  return (
    <>
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
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2"
            aria-label="Scroll to top"
          >
            <span className="text-green-400 font-mono text-lg">$</span>
            <span className="font-mono font-bold text-zinc-900 dark:text-white">Ilia</span>
          </button>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 font-mono text-sm">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Link
                href="/blog"
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                blog
              </Link>
            </div>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-zinc-900 dark:text-white p-2"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Close Button */}
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-zinc-900 dark:text-white p-2"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-6">
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(link.id)}
                      className="block w-full text-left font-mono text-lg text-zinc-900 dark:text-white hover:text-green-400 dark:hover:text-green-400 transition-colors"
                    >
                      <span className="text-green-400 mr-2">$</span>
                      {link.label}
                    </motion.button>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                  >
                    <Link
                      href="/blog"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left font-mono text-lg text-zinc-900 dark:text-white hover:text-green-400 dark:hover:text-green-400 transition-colors"
                    >
                      <span className="text-green-400 mr-2">$</span>
                      blog
                    </Link>
                  </motion.div>
                </nav>

                {/* Divider */}
                <div className="my-8 h-px bg-zinc-200 dark:bg-zinc-800" />

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3 text-sm"
                >
                  <a
                    href="https://github.com/Ilia01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-zinc-600 dark:text-zinc-400 hover:text-green-400 transition-colors"
                  >
                    → GitHub
                  </a>
                  <a
                    href="mailto:ilia.goginashvili.1@btu.edu.ge"
                    className="block text-zinc-600 dark:text-zinc-400 hover:text-green-400 transition-colors"
                  >
                    → Email
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
