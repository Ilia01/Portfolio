"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Briefcase,
  Users,
  Code,
  MessageSquare,
  ArrowLeft,
  Send,
  Loader2,
  CheckCircle,
} from "lucide-react";

type Intent = "hiring" | "collaboration" | "technical" | "hello";
type Step = "intent" | "form" | "success";

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const intents = [
  {
    id: "hiring" as Intent,
    label: "Hiring inquiry",
    description: "Looking to bring me on your team",
    icon: Briefcase,
  },
  {
    id: "collaboration" as Intent,
    label: "Project collaboration",
    description: "Have an idea to work on together",
    icon: Users,
  },
  {
    id: "technical" as Intent,
    label: "Technical question",
    description: "Question about my work or code",
    icon: Code,
  },
  {
    id: "hello" as Intent,
    label: "Just saying hi",
    description: "Want to connect or chat",
    icon: MessageSquare,
  },
];

export function ContactPanel({ isOpen, onClose }: ContactPanelProps) {
  const [step, setStep] = useState<Step>("intent");
  const [intent, setIntent] = useState<Intent | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
    honeypot: "", // spam protection
  });

  const handleIntentSelect = (selectedIntent: Intent) => {
    setIntent(selectedIntent);
    setStep("form");
  };

  const handleBack = () => {
    setStep("intent");
    setIntent(null);
  };

  const handleClose = () => {
    onClose();
    // Reset state after animation
    setTimeout(() => {
      setStep("intent");
      setIntent(null);
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        message: "",
        honeypot: "",
      });
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      setStep("success");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent,
          ...formData,
        }),
      });

      if (response.ok) {
        setStep("success");
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMessageLabel = () => {
    switch (intent) {
      case "hiring":
        return "Tell me about the opportunity";
      case "collaboration":
        return "Describe your project idea";
      case "technical":
        return "What's your question?";
      default:
        return "Your message";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white dark:bg-zinc-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                {step === "form" && (
                  <button
                    onClick={handleBack}
                    className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-zinc-500" />
                  </button>
                )}
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {step === "success" ? "Message sent!" : "Get in touch"}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {step === "intent" && (
                  <motion.div
                    key="intent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                      What brings you here today?
                    </p>
                    {intents.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleIntentSelect(item.id)}
                        className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-green-500 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-500/5 transition-all text-left group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-green-100 dark:group-hover:bg-green-500/10 transition-colors">
                            <item.icon className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-green-600 dark:group-hover:text-green-400" />
                          </div>
                          <div>
                            <h3 className="font-medium text-zinc-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                              {item.label}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-500">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}

                {step === "form" && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Honeypot - hidden from users */}
                    <input
                      type="text"
                      name="website"
                      value={formData.honeypot}
                      onChange={(e) =>
                        setFormData({ ...formData, honeypot: e.target.value })
                      }
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="you@example.com"
                      />
                    </div>

                    {intent === "hiring" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) =>
                              setFormData({ ...formData, company: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="Your company name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Role/Position
                          </label>
                          <input
                            type="text"
                            value={formData.role}
                            onChange={(e) =>
                              setFormData({ ...formData, role: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="e.g. Backend Developer"
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        {getMessageLabel()} *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                        placeholder="Write your message..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}

                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                      Thanks for reaching out!
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                      I typically respond within 24 hours.
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-6 py-2 text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer - only show on intent/form steps */}
            {step !== "success" && (
              <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-xs text-zinc-500 dark:text-zinc-500 text-center">
                  I typically respond within 24 hours
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
