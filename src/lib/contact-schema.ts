export const SUBJECT_OPTIONS = [
  { value: "job", label: "Job opportunity" },
  { value: "freelance", label: "Freelance project" },
  { value: "open-source", label: "Open source / collaboration" },
  { value: "other", label: "Other" },
] as const;

export type SubjectValue = (typeof SUBJECT_OPTIONS)[number]["value"];

export type ContactPayload = {
  name: string;
  email: string;
  subject: SubjectValue;
  message: string;
  website?: string; // honeypot
};

export type ContactErrors = Partial<
  Record<keyof Omit<ContactPayload, "website">, string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: Partial<ContactPayload>): {
  ok: boolean;
  errors: ContactErrors;
  data?: ContactPayload;
} {
  const errors: ContactErrors = {};

  const name = (input.name ?? "").trim();
  if (name.length < 2) errors.name = "Please share your name.";
  else if (name.length > 100) errors.name = "Name is too long.";

  const email = (input.email ?? "").trim();
  if (!EMAIL_RE.test(email)) errors.email = "Use a valid email address.";

  const subject = input.subject as SubjectValue | undefined;
  if (!subject || !SUBJECT_OPTIONS.some((o) => o.value === subject)) {
    errors.subject = "Pick a topic.";
  }

  const message = (input.message ?? "").trim();
  if (message.length < 10) errors.message = "Tell me a bit more (10+ chars).";
  else if (message.length > 2000) errors.message = "Message is too long.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    errors: {},
    data: {
      name,
      email,
      subject: subject as SubjectValue,
      message,
      website: input.website,
    },
  };
}
