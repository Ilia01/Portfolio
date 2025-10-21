import Link from "next/link";
import { ChevronLeft, Code2, Zap, Shield, Lock } from "lucide-react";
import { CodePlayground } from "@/components/code-playground";

export const metadata = {
  title: "Learning Lab | Ilia Goginashvili",
  description: "Interactive code playground for learning backend security concepts and algorithms through hands-on examples",
};

export default function LabPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-mono text-zinc-600 dark:text-zinc-400 hover:text-green-400 transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Hero Section */}
        <div className="mb-12 relative">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 rounded-2xl blur-3xl" />

          <div className="relative">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-green-400 font-mono text-xl">$</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
                  Learning Lab
                </h1>
              </div>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 font-mono max-w-3xl">
                Interactive playground for backend security concepts and algorithms
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-white/50 dark:bg-zinc-950/50 backdrop-blur border border-zinc-200 dark:border-zinc-800">
                <Code2 className="w-6 h-6 text-green-400 mb-2" />
                <h3 className="text-sm font-mono font-semibold text-zinc-900 dark:text-white mb-1">
                  Live Code Editor
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Monaco-powered editor with syntax highlighting
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/50 dark:bg-zinc-950/50 backdrop-blur border border-zinc-200 dark:border-zinc-800">
                <Shield className="w-6 h-6 text-green-400 mb-2" />
                <h3 className="text-sm font-mono font-semibold text-zinc-900 dark:text-white mb-1">
                  Security Focused
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Learn TOTP, JWT, rate limiting, and more
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/50 dark:bg-zinc-950/50 backdrop-blur border border-zinc-200 dark:border-zinc-800">
                <Zap className="w-6 h-6 text-green-400 mb-2" />
                <h3 className="text-sm font-mono font-semibold text-zinc-900 dark:text-white mb-1">
                  Instant Execution
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Run TypeScript code directly in your browser
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/50 dark:bg-zinc-950/50 backdrop-blur border border-zinc-200 dark:border-zinc-800">
                <Lock className="w-6 h-6 text-green-400 mb-2" />
                <h3 className="text-sm font-mono font-semibold text-zinc-900 dark:text-white mb-1">
                  Safe Sandbox
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Secure execution environment, no server needed
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="p-6 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <span className="text-green-400 font-mono font-semibold">💡 Pro Tip:</span> All examples are based on real implementations from my blog posts.
                Click &quot;Run Code&quot; to see them in action, then modify the code to experiment and learn!
              </p>
            </div>
          </div>
        </div>

        {/* Code Playground */}
        <CodePlayground />
      </div>
    </div>
  );
}
