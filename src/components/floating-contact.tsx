"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, X, MessageCircle } from "lucide-react";
import { profileData } from "@/lib/data";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      icon: Mail,
      href: `mailto:${profileData.contact.email}`,
      label: "Email",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: Linkedin,
      href: profileData.contact.linkedin,
      label: "LinkedIn",
      color: "bg-blue-600 hover:bg-blue-700",
      external: true,
    },
    {
      icon: Github,
      href: profileData.contact.github,
      label: "GitHub",
      color: "bg-zinc-700 hover:bg-zinc-600",
      external: true,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2"
          >
            {contacts.map((contact, index) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg ${contact.color} transition-colors`}
                aria-label={contact.label}
              >
                <contact.icon className="w-4 h-4" />
                <span>{contact.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isOpen
            ? "bg-zinc-700 hover:bg-zinc-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
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
  );
}
