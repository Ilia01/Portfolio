import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact, SUBJECT_OPTIONS } from "@/lib/contact-schema";

export const runtime = "nodejs";

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function subjectLabel(value: string) {
  return SUBJECT_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const input = (body ?? {}) as Record<string, unknown>;

  // Honeypot: bots fill hidden field. Pretend success, drop silently.
  if (typeof input.website === "string" && input.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const result = validateContact({
    name: typeof input.name === "string" ? input.name : "",
    email: typeof input.email === "string" ? input.email : "",
    subject:
      typeof input.subject === "string"
        ? (input.subject as never)
        : ("other" as never),
    message: typeof input.message === "string" ? input.message : "",
  });

  if (!result.ok || !result.data) {
    return NextResponse.json(
      { ok: false, errors: result.errors },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.error("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return NextResponse.json(
      { ok: false, error: "Email service not configured." },
      { status: 500 },
    );
  }

  const { name, email, subject, message } = result.data;
  const topic = subjectLabel(subject);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${from}>`,
      to: [to],
      replyTo: email,
      subject: `[${topic}] ${name} via portfolio`,
      text: `From: ${name} <${email}>\nTopic: ${topic}\n\n${message}`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#161412;color:#ede9e2;">
          <p style="font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#d4a054;margin:0 0 4px;">${escape(topic)}</p>
          <h2 style="font-family:Georgia,serif;font-size:22px;margin:0 0 16px;color:#ede9e2;">${escape(name)}</h2>
          <p style="font-family:ui-monospace,monospace;font-size:13px;color:#a39d95;margin:0 0 20px;">
            <a href="mailto:${escape(email)}" style="color:#d4a054;text-decoration:none;">${escape(email)}</a>
          </p>
          <hr style="border:0;border-top:1px solid #2c2825;margin:0 0 20px;" />
          <p style="white-space:pre-wrap;line-height:1.7;color:#ede9e2;font-size:15px;margin:0;">${escape(message)}</p>
        </div>`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not send right now. Please email me directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong." },
      { status: 500 },
    );
  }
}
