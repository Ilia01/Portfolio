"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, X, MessageCircle } from "lucide-react";
import { profileData } from "@/lib/data";
import { ContactPanel } from "./contact-panel";

export function FloatingContact() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleEmailClick = () => {
    setIsMenuOpen(false);
    setIsPanelOpen(true);
  };

  const externalLinks = [
    {
      icon: Linkedin,
      href: profileData.contact.linkedin,
      label: "LinkedIn",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: Github,
      href: profileData.contact.github,
      label: "GitHub",
      color: "bg-zinc-700 hover:bg-zinc-600",
    },
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2"
            >
              {/* Email button - opens panel */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0 }}
                onClick={handleEmailClick}
                className="flex items-center gap-3 px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg bg-green-500 hover:bg-green-600 transition-colors"
                aria-label="Send email"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </motion.button>

              {/* External links */}
              {externalLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: (index + 1) * 0.05 }}
                  className={`flex items-center gap-3 px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg ${link.color} transition-colors`}
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
            isMenuOpen
              ? "bg-zinc-700 hover:bg-zinc-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isMenuOpen ? "Close contact menu" : "Open contact menu"}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <ContactPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </>
  );
}
