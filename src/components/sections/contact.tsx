"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Loader2, Check } from "lucide-react";
import { profileData } from "@/lib/data";
import { SectionHeader } from "@/components/section-header";
import { LocalClock } from "@/components/local-clock";
import { SelectField } from "@/components/select-field";
import {
  SUBJECT_OPTIONS,
  validateContact,
  type ContactErrors,
  type SubjectValue,
} from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

const TOPIC_COPY: Record<
  SubjectValue,
  { headline: string; placeholder: string; hints: string[] }
> = {
  job: {
    headline: "What's the role?",
    placeholder:
      "Hi Ilia, we're hiring a backend eng at Acme. Node and Postgres, fully remote within EU. Found you through your HookLens repo and figured we'd reach out.",
    hints: ["Company and stack", "Remote or office", "Why me"],
  },
  freelance: {
    headline: "What do you want to build?",
    placeholder:
      "Hey, I run a small coaching practice and want a site that actually books calls. Budget around $2k, hoping to launch by mid July.",
    hints: ["What it is", "Budget and timing", "Where I fit in"],
  },
  "open-source": {
    headline: "What are you working on?",
    placeholder:
      "Was poking around HookLens and noticed Slack signatures aren't supported yet. Happy to send a PR if you'd take it.",
    hints: ["Repo or idea", "What you need", "Links if any"],
  },
  other: {
    headline: "What's up?",
    placeholder:
      "Podcast invite, random question, want to grab a coffee. Anything works.",
    hints: [],
  },
};

const initialForm = {
  name: "",
  email: "",
  subject: "job" as SubjectValue,
  message: "",
  website: "", // honeypot
};

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const update = <K extends keyof typeof initialForm>(
    key: K,
    value: (typeof initialForm)[K],
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as keyof ContactErrors]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const result = validateContact(form);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = (await res.json()) as {
        ok: boolean;
        errors?: ContactErrors;
        error?: string;
      };

      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(initialForm);
    } catch {
      setServerError("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          index="04"
          kicker="Contact"
          title="Let's talk."
          lede="Drop a line. I read every message and reply within a day."
        />

        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {status === "success" ? (
              <SuccessCard onReset={() => setStatus("idle")} />
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <Honeypot
                  value={form.website}
                  onChange={(v) => update("website", v)}
                />

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    id="name"
                    label="Name"
                    error={errors.name}
                    value={form.name}
                    onChange={(v) => update("name", v)}
                    autoComplete="name"
                  />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    error={errors.email}
                    value={form.email}
                    onChange={(v) => update("email", v)}
                    autoComplete="email"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Topic</Label>
                  <SelectField
                    id="subject"
                    value={form.subject}
                    onChange={(v) => update("subject", v)}
                    options={SUBJECT_OPTIONS}
                    error={errors.subject}
                  />
                  {errors.subject && <ErrorText>{errors.subject}</ErrorText>}
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  {TOPIC_COPY[form.subject].hints.length > 0 && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={form.subject}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] text-ash tracking-wide -mt-0.5 mb-2"
                      >
                        {TOPIC_COPY[form.subject].hints.map((h, i) => (
                          <span key={h} className="flex items-center gap-3">
                            {i > 0 && (
                              <span
                                className="w-1 h-1 rounded-full bg-rule"
                                aria-hidden
                              />
                            )}
                            {h}
                          </span>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  )}

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`headline-${form.subject}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25 }}
                      className="font-serif text-lg text-cream/90 mb-2"
                    >
                      {TOPIC_COPY[form.subject].headline}
                    </motion.p>
                  </AnimatePresence>

                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className={`w-full bg-transparent border-0 border-b ${
                      errors.message ? "border-red-400/60" : "border-rule"
                    } py-2 text-cream font-sans leading-relaxed focus:outline-none focus:border-amber transition-colors resize-none placeholder:text-ash/60`}
                    placeholder={TOPIC_COPY[form.subject].placeholder}
                  />
                  {errors.message && <ErrorText>{errors.message}</ErrorText>}
                </div>

                {serverError && status === "error" && (
                  <p className="font-mono text-xs text-red-400/90">
                    {serverError}
                  </p>
                )}

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center gap-2 font-mono text-sm text-amber border border-amber/40 px-7 py-3 rounded hover:bg-amber/10 hover:border-amber/60 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Channels */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:pl-8 md:border-l md:border-rule/60"
          >
            <p className="font-mono text-[10px] text-amber/70 uppercase tracking-[0.25em] mb-5">
              Or reach out directly
            </p>
            <ul className="space-y-1 mb-10">
              <Channel
                href={`mailto:${profileData.contact.email}`}
                title="Email"
                value={profileData.contact.email}
              />
              <Channel
                href={profileData.contact.linkedin}
                title="LinkedIn"
                value="ilia-goginashvili"
                external
              />
              <Channel
                href={profileData.contact.github}
                title="GitHub"
                value="@Ilia01"
                external
              />
              <Channel
                href={profileData.resumeUrl}
                title="Résumé"
                value="PDF · download"
                download
              />
            </ul>

            <div className="font-mono text-[11px] text-ash leading-relaxed">
              <span className="block text-amber/60 uppercase tracking-[0.2em] mb-1.5">
                Tbilisi · Live
              </span>
              <span className="text-stone">
                <LocalClock />
              </span>{" "}
              local · replies within ~24h.
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function Honeypot({
  value,
  onChange,
}: Readonly<{ value: string; onChange: (v: string) => void }>) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        width: 1,
        height: 1,
        overflow: "hidden",
      }}
    >
      <label>
        Website
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

function Label({
  htmlFor,
  children,
}: Readonly<{ htmlFor: string; children: React.ReactNode }>) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-mono text-[10px] text-amber/70 uppercase tracking-[0.2em] mb-1.5"
    >
      {children}
    </label>
  );
}

function ErrorText({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <p className="font-mono text-[11px] text-red-400/90 mt-1.5">{children}</p>
  );
}

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
}: Readonly<{
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
}>) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-transparent border-0 border-b ${
          error ? "border-red-400/60" : "border-rule"
        } py-2 text-cream font-sans focus:outline-none focus:border-amber transition-colors`}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function Channel({
  href,
  title,
  value,
  external,
  download,
}: Readonly<{
  href: string;
  title: string;
  value: string;
  external?: boolean;
  download?: boolean;
}>) {
  const extraProps = (() => {
    if (download) return { download: true };
    if (external) return { target: "_blank", rel: "noopener noreferrer" };
    return {};
  })();
  return (
    <li>
      <a
        href={href}
        {...extraProps}
        className="group flex items-center justify-between gap-4 py-3 border-b border-rule/40 hover:border-amber/40 transition-colors"
      >
        <div className="flex flex-col min-w-0">
          <span className="text-cream group-hover:text-amber transition-colors">
            {title}
          </span>
          <span className="font-mono text-xs text-ash truncate">{value}</span>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-ash group-hover:text-amber group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
      </a>
    </li>
  );
}

function SuccessCard({ onReset }: Readonly<{ onReset: () => void }>) {
  return (
    <div className="border border-amber/30 bg-amber/5 rounded p-8 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber/15 border border-amber/40 mb-5">
        <Check className="w-5 h-5 text-amber" />
      </div>
      <h3 className="font-serif text-2xl text-cream mb-3">Message sent.</h3>
      <p className="text-stone leading-relaxed max-w-sm mx-auto mb-6">
        Thanks for reaching out. I&apos;ll get back to you within a day.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="font-mono text-xs text-stone hover:text-amber tracking-wide transition-colors"
      >
        Send another →
      </button>
    </div>
  );
}
