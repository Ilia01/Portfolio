"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const bootMessages = [
  { delay: 0, message: "[  OK  ] Starting Portfolio Services..." },
  { delay: 300, message: "[  OK  ] Loaded Projects Database" },
  { delay: 600, message: "[  OK  ] Mounted Skills Filesystem" },
  { delay: 900, message: "[  OK  ] Started Networking (GitHub, LinkedIn)" },
  { delay: 1200, message: "[  OK  ] Started Authentication Service (Aegis2FA)" },
  { delay: 1500, message: "[  OK  ] Loaded API Documentation (ApiFlow)" },
  { delay: 1800, message: "[  OK  ] Reached target Developer Mode" },
  { delay: 2100, message: "" },
  { delay: 2400, message: "         Welcome to Arch^H^H^H^H Ilia's Portfolio" },
  { delay: 2700, message: "         I use Arch btw 🐧" },
];

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= bootMessages.length) {
      setTimeout(onComplete, 500);
      return;
    }

    const timer = setTimeout(() => {
      setVisibleMessages((prev) => [...prev, bootMessages[currentIndex].message]);
      setCurrentIndex((prev) => prev + 1);
    }, bootMessages[currentIndex].delay);

    return () => clearTimeout(timer);
  }, [currentIndex, onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
      <div className="max-w-3xl w-full px-4">
        <div className="space-y-2 font-mono text-sm text-green-400">
          <AnimatePresence>
            {visibleMessages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                className={message ? "" : "h-4"}
              >
                {message}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
