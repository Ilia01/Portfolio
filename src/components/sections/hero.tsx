"use client";

import { motion } from "framer-motion";
import { InteractiveTerminal } from "@/components/interactive-terminal";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          {/* Terminal Window */}
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center text-sm font-mono text-zinc-500 dark:text-zinc-400">
                ilia@portfolio:~ - Interactive Terminal
              </div>
              <div className="text-xs font-mono hidden md:block text-zinc-500 dark:text-zinc-400">
                zsh
              </div>
            </div>

            {/* Interactive Terminal */}
            <div className="h-[500px]">
              <InteractiveTerminal />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
