"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function KonamiCode() {
  const [input, setInput] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setInput((prev) => {
        const newInput = [...prev, e.key].slice(-KONAMI_CODE.length);

        // Check if Konami code is entered
        if (newInput.join(",") === KONAMI_CODE.join(",")) {
          setActivated(true);
          setTimeout(() => setActivated(false), 5000);
          return [];
        }

        return newInput;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] pointer-events-none overflow-hidden"
        >
          {/* Matrix Rain Effect */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Matrix characters */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, opacity: 0 }}
                animate={{
                  y: "100vh",
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="absolute text-green-400 font-mono text-sm"
                style={{
                  left: `${(i * 2) % 100}%`,
                }}
              >
                {String.fromCharCode(0x30a0 + Math.random() * 96)}
              </motion.div>
            ))}
          </div>

          {/* Achievement Message */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", damping: 10 }}
              className="bg-zinc-900 border-2 border-green-400 rounded-lg p-8 shadow-2xl shadow-green-400/50 max-w-md"
            >
              <div className="text-center space-y-4">
                <div className="text-6xl">🎮</div>
                <h2 className="text-2xl font-bold text-green-400 font-mono">
                  ACHIEVEMENT UNLOCKED!
                </h2>
                <p className="text-zinc-300 font-mono">
                  You found the Konami Code!
                </p>
                <div className="text-sm text-zinc-500 font-mono">
                  <p>30 extra lives granted 💚</p>
                  <p className="mt-2">You&apos;re a true gamer!</p>
                  <p className="mt-4 text-xs">
                    (BTW I use Arch, and apparently you use cheat codes 😏)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
