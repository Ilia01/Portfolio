"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  Terminal as TerminalIcon,
  Copy,
  Check,
  Loader2,
  Clock,
  Trash2,
  Maximize2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { codeExamples, categories, type CodeExample } from "@/lib/code-examples";
import { executeCode, formatExecutionTime, type ConsoleMessage } from "@/lib/code-executor";

export function CodePlayground() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<CodeExample['category']>(categories[0].id as CodeExample['category']);
  const [selectedExample, setSelectedExample] = useState<CodeExample>(
    codeExamples.filter((ex) => ex.category === categories[0].id)[0]
  );
  const [code, setCode] = useState(selectedExample.code);
  const [output, setOutput] = useState<ConsoleMessage[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const categoryExamples = codeExamples.filter((ex) => ex.category === selectedCategory);

  useEffect(() => {
    setCode(selectedExample.code);
    setOutput([]);
    setExecutionTime(null);
  }, [selectedExample]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput([]);

    try {
      const result = await executeCode(code);
      setOutput(result.output);
      setExecutionTime(result.executionTime);
    } catch (error) {
      setOutput([
        {
          type: "error",
          message: `Execution failed: ${error instanceof Error ? error.message : String(error)}`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(selectedExample.code);
    setOutput([]);
    setExecutionTime(null);
  };

  const handleClearOutput = () => {
    setOutput([]);
    setExecutionTime(null);
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMessageColor = (type: ConsoleMessage["type"]) => {
    switch (type) {
      case "error":
        return "text-red-400";
      case "warn":
        return "text-yellow-400";
      case "info":
        return "text-blue-400";
      default:
        return "text-green-400";
    }
  };

  const getMessageIcon = (type: ConsoleMessage["type"]) => {
    switch (type) {
      case "error":
        return "❌";
      case "warn":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "▸";
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id);
              const firstExample = codeExamples.find((ex) => ex.category === category.id);
              if (firstExample) setSelectedExample(firstExample);
            }}
            className={`px-4 py-2.5 rounded-lg font-mono text-sm transition-all ${
              selectedCategory === category.id
                ? "bg-green-500/20 text-green-400 border-2 border-green-500/40 shadow-lg shadow-green-500/20"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-2 border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Example Selector & Info */}
      <div className="space-y-4">
        {/* Example Dropdown */}
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedExample.id}
            onChange={(e) => {
              const example = codeExamples.find((ex) => ex.id === e.target.value);
              if (example) setSelectedExample(example);
            }}
            className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          >
            {categoryExamples.map((example) => (
              <option key={example.id} value={example.id}>
                {example.title}
              </option>
            ))}
          </select>

          {/* Difficulty Badge */}
          <div
            className={`px-4 py-3 rounded-lg border-2 font-mono text-sm font-semibold text-center min-w-[140px] ${
              selectedExample.difficulty === "advanced"
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : selectedExample.difficulty === "intermediate"
                ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                : "bg-green-500/10 border-green-500/30 text-green-400"
            }`}
          >
            {selectedExample.difficulty.toUpperCase()}
          </div>
        </div>

        {/* Example Description */}
        <motion.div
          key={selectedExample.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
        >
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {selectedExample.description}
          </p>
          {selectedExample.blogPost && (
            <a
              href={selectedExample.blogPost}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-xs font-mono text-green-400 hover:text-green-300 underline"
            >
              📚 Read full blog post →
            </a>
          )}
        </motion.div>
      </div>

      {/* Editor & Console */}
      <div className={`grid ${isFullscreen ? "grid-cols-1" : "lg:grid-cols-2"} gap-6`}>
        {/* Code Editor Panel */}
        <div className="space-y-3">
          {/* Editor Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-green-400" />
              Code Editor
            </h3>

            {/* Toolbar */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
                title="Copy code"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
                title="Reset to example"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={setIsFullscreen.bind(null, !isFullscreen)}
                className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
                title="Toggle fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white font-mono text-sm flex items-center gap-2 transition-colors shadow-lg shadow-green-500/20"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run Code
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="rounded-lg overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 focus-within:border-green-400 dark:focus-within:border-green-400 transition-colors shadow-xl">
            <Editor
              height="600px"
              language="typescript"
              value={code}
              onChange={(value) => setCode(value || "")}
              theme={theme === "dark" ? "vs-dark" : "light"}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "var(--font-geist-mono), monospace",
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
                padding: { top: 16, bottom: 16 },
                bracketPairColorization: { enabled: true },
                smoothScrolling: true,
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
                folding: true,
                lineDecorationsWidth: 10,
                lineNumbersMinChars: 3,
              }}
              loading={
                <div className="flex items-center justify-center h-[600px] bg-zinc-50 dark:bg-zinc-900">
                  <Loader2 className="w-8 h-8 animate-spin text-green-400" />
                </div>
              }
            />
          </div>
        </div>

        {/* Console Output Panel */}
        <div className="space-y-3">
          {/* Console Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-green-400" />
              Console Output
              {executionTime !== null && (
                <span className="text-xs text-zinc-500 dark:text-zinc-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatExecutionTime(executionTime)}
                </span>
              )}
            </h3>

            {output.length > 0 && (
              <button
                onClick={handleClearOutput}
                className="px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>

          {/* Console Display */}
          <div className="h-[600px] rounded-lg bg-zinc-950 border-2 border-zinc-800 p-4 overflow-auto font-mono text-sm shadow-xl">
            {output.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-zinc-600">
                <TerminalIcon className="w-12 h-12 mb-3 opacity-50" />
                <p className="text-sm italic">Click &quot;Run Code&quot; to see output...</p>
                <p className="text-xs mt-2 opacity-75">Keyboard shortcut: Ctrl+Enter</p>
              </div>
            ) : (
              <AnimatePresence>
                <div className="space-y-1">
                  {output.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-zinc-600 select-none shrink-0">
                        {getMessageIcon(msg.type)}
                      </span>
                      <span className={`${getMessageColor(msg.type)} break-words whitespace-pre-wrap leading-relaxed`}>
                        {msg.message}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
          <span>ℹ️ Code runs in your browser (client-side)</span>
          <span className="hidden sm:inline">•</span>
          <span>🔒 Sandboxed execution environment</span>
          <span className="hidden sm:inline">•</span>
          <span>💡 Feel free to modify and experiment!</span>
        </div>
      </div>
    </div>
  );
}
