"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Loader2, Check } from "lucide-react";
import { profileData } from "@/lib/data";
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
      "Hi Ilia, we're hiring a full-stack eng. TypeScript and Next.js, fully remote within EU. Found you through your work and figured we'd reach out.",
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
  website: "",
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function Contact() {
  const reduce = useReducedMotion();
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
    <section
      id="contact"
      className="relative w-full px-6 sm:px-10 py-24 sm:py-32 scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 max-w-3xl"
        >
          <h2 className="text-balance text-4xl sm:text-5xl font-medium tracking-[-0.025em] text-cream">
            Tell me what you&apos;re building.
          </h2>
          <p className="mt-5 max-w-[58ch] text-pretty text-base sm:text-lg leading-relaxed text-stone">
            One message, one reply within a day. I read everything that comes
            through this form, and I write back to all of it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:col-span-7"
          >
            {status === "success" ? (
              <SuccessCard onReset={() => setStatus("idle")} />
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-7">
                <Honeypot
                  value={form.website}
                  onChange={(v) => update("website", v)}
                />

                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
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
                  <div className="flex items-baseline justify-between gap-3">
                    <Label htmlFor="message">Message</Label>
                    {TOPIC_COPY[form.subject].hints.length > 0 && (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={form.subject}
                          initial={reduce ? false : { opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -3 }}
                          transition={{ duration: 0.22 }}
                          className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10.5px] tracking-[0.05em] text-ash"
                        >
                          {TOPIC_COPY[form.subject].hints.map((h, i) => (
                            <span key={h} className="flex items-center gap-2">
                              {i > 0 && (
                                <span
                                  className="inline-block h-px w-2 bg-rule"
                                  aria-hidden
                                />
                              )}
                              {h}
                            </span>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`headline-${form.subject}`}
                      initial={reduce ? false : { opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.22 }}
                      className="mt-2 text-lg font-medium tracking-[-0.01em] text-cream"
                    >
                      {TOPIC_COPY[form.subject].headline}
                    </motion.p>
                  </AnimatePresence>

                  <textarea
                    id="message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className={`mt-3 w-full resize-none border-0 border-b bg-transparent py-2.5 font-sans leading-relaxed text-cream transition-colors placeholder:text-ash/60 focus:outline-none ${
                      errors.message
                        ? "border-red-400/60 focus:border-red-400"
                        : "border-rule focus:border-amber"
                    }`}
                    placeholder={TOPIC_COPY[form.subject].placeholder}
                  />
                  {errors.message && <ErrorText>{errors.message}</ErrorText>}
                </div>

                {serverError && status === "error" && (
                  <p className="font-mono text-xs text-red-400/90">
                    {serverError}
                  </p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 font-mono text-sm font-medium text-ink transition-all hover:bg-amber-light active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          <motion.aside
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="lg:col-span-5 lg:border-l lg:border-rule/60 lg:pl-10"
          >
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ash">
                Or reach me directly
              </p>
              <ul className="mt-5 divide-y divide-rule/60 border-y border-rule/60">
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
                  value="PDF, download"
                  download
                />
              </ul>
            </div>

            <div className="mt-10">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ash">
                Right now
              </p>
              <div className="mt-4 space-y-3 text-sm leading-relaxed">
                <p className="flex items-baseline gap-3 text-cream">
                  <span className="inline-flex h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-amber" />
                  <span>
                    Tbilisi, GMT+4. Local time{" "}
                    <span className="font-mono text-stone">
                      <LocalClock />
                    </span>
                    .
                  </span>
                </p>
                <p className="pl-[18px] text-stone">
                  I reply within a day on weekdays. For freelance, include
                  scope, timeline, and budget if you have one.
                </p>
              </div>
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
      className="block font-mono text-[10.5px] uppercase tracking-[0.22em] text-ash"
    >
      {children}
    </label>
  );
}

function ErrorText({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <p className="mt-2 font-mono text-[11px] text-red-400/90">{children}</p>
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
        className={`mt-2 w-full border-0 border-b bg-transparent py-2.5 font-sans text-cream transition-colors focus:outline-none ${
          error
            ? "border-red-400/60 focus:border-red-400"
            : "border-rule focus:border-amber"
        }`}
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
        className="group flex items-center justify-between gap-4 py-3.5 transition-colors"
      >
        <div className="flex min-w-0 flex-col">
          <span className="text-cream transition-colors group-hover:text-amber">
            {title}
          </span>
          <span className="truncate font-mono text-[11px] text-ash">
            {value}
          </span>
        </div>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ash transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber" />
      </a>
    </li>
  );
}

function SuccessCard({ onReset }: Readonly<{ onReset: () => void }>) {
  return (
    <div className="rounded-2xl border border-amber/30 bg-amber/[0.04] p-10 text-center">
      <div className="mx-auto mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-amber/40 bg-amber/15">
        <Check className="h-5 w-5 text-amber" strokeWidth={1.75} />
      </div>
      <h3 className="text-balance text-2xl font-medium tracking-[-0.015em] text-cream">
        Message sent.
      </h3>
      <p className="mx-auto mt-3 max-w-sm leading-relaxed text-stone">
        Thanks for reaching out. I will reply within a day.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-stone tracking-wide transition-colors hover:text-amber"
      >
        Send another
        <ArrowUpRight className="h-3 w-3" />
      </button>
    </div>
  );
}
