"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { parseCommand, CommandOutput } from "@/lib/terminal-commands";

interface TerminalLine {
  type: "input" | "output";
  content: string;
  outputType?: "text" | "error" | "success" | "ascii" | "navigate";
}

export function InteractiveTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "output",
      content: "Welcome! Type 'help' for available commands, or just explore!",
      outputType: "success",
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [vimMode, setVimMode] = useState<"normal" | "insert">("insert");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Global keyboard listeners for vim mode
  useEffect(() => {
    const handleGlobalKeyPress = (e: globalThis.KeyboardEvent) => {
      if (e.key === "i" && vimMode === "normal" && document.activeElement !== inputRef.current) {
        setVimMode("insert");
        inputRef.current?.focus();
      } else if (e.key === "Escape" && vimMode === "insert") {
        setVimMode("normal");
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyPress);
    return () => window.removeEventListener("keydown", handleGlobalKeyPress);
  }, [vimMode]);

  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    // Add command to history
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    // Add input line
    setLines((prev) => [...prev, { type: "input", content: cmd }]);

    // Special commands
    if (cmd.trim() === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    if (cmd.trim() === "vim") {
      setVimMode("insert");
      setLines((prev) => [
        ...prev,
        {
          type: "output",
          content:
            "Entering vim mode...\nPress 'i' for INSERT mode, 'Esc' for NORMAL mode\nType ':q' to quit (good luck! 😏)",
          outputType: "text",
        },
      ]);
      setInput("");
      return;
    }

    // Parse and execute command
    const result: CommandOutput = parseCommand(cmd);

    // Handle navigation
    if (result.type === "navigate" && result.navigateTo) {
      const element = document.getElementById(result.navigateTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    // Add output
    setLines((prev) => [
      ...prev,
      {
        type: "output",
        content: result.content,
        outputType: result.type,
      },
    ]);

    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // If in NORMAL mode, prevent all input except Enter for existing command
    if (vimMode === "normal" && e.key !== "Enter" && e.key !== "Escape") {
      e.preventDefault();
      return;
    }

    // Handle command history (Up/Down arrows)
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    } else if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple autocomplete could be added here
    }
  };

  return (
    <div className="h-full flex flex-col font-mono text-sm">
      {/* Terminal Output */}
      <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        <AnimatePresence>
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {line.type === "input" ? (
                <div className="flex items-start gap-2">
                  <span className="text-green-400">$</span>
                  <span className="text-zinc-700 dark:text-zinc-300">{line.content}</span>
                </div>
              ) : (
                <div
                  className={`pl-4 whitespace-pre-wrap ${
                    line.outputType === "error"
                      ? "text-red-400"
                      : line.outputType === "success"
                      ? "text-green-400"
                      : line.outputType === "ascii"
                      ? "text-cyan-400"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {line.content}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input Line */}
        <div className="flex items-center gap-2">
          <span className="text-green-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              // Only allow changes in INSERT mode
              if (vimMode === "insert") {
                setInput(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            className={`flex-1 bg-transparent outline-none text-zinc-700 dark:text-zinc-300 placeholder-zinc-500 dark:placeholder-zinc-600 ${
              vimMode === "insert" ? "caret-green-400" : "caret-transparent"
            }`}
            placeholder={vimMode === "insert" ? "Type 'help' for commands..." : "Press 'i' to type..."}
            spellCheck={false}
            autoComplete="off"
            readOnly={vimMode === "normal"}
          />
          <span className={`text-green-400 ${vimMode === "insert" ? "animate-pulse" : "opacity-50"}`}>
            {vimMode === "insert" ? "_" : "█"}
          </span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span>
            {vimMode === "insert" ? "-- INSERT --" : "-- NORMAL --"}
          </span>
          <span className="text-zinc-400 dark:text-zinc-600">|</span>
          <span>History: {history.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Press</span>
          <kbd className="px-2 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-zinc-700 dark:text-zinc-300">i</kbd>
          <span>for INSERT mode</span>
        </div>
      </div>
    </div>
  );
}
