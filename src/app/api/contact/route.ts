import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT_EMAIL = "iliagoginashvili16@gmail.com";

// Initialize Resend lazily to avoid build errors
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

type Intent = "hiring" | "collaboration" | "technical" | "hello";

interface ContactRequest {
  intent: Intent;
  name: string;
  email: string;
  company?: string;
  role?: string;
  message: string;
}

const intentLabels: Record<Intent, string> = {
  hiring: "Hiring Inquiry",
  collaboration: "Project Collaboration",
  technical: "Technical Question",
  hello: "Just Saying Hi",
};

function generateEmailHtml(data: ContactRequest): string {
  const intentLabel = intentLabels[data.intent];

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #22c55e; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .intent-badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 14px; }
          .content { background: #f9fafb; padding: 24px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 16px; }
          .label { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
          .value { font-size: 16px; color: #111827; }
          .message-box { background: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 16px; }
          .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="intent-badge">${intentLabel}</span>
            <h1 style="margin: 16px 0 0 0; font-size: 24px;">New message from ${data.name}</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">From</div>
              <div class="value">${data.name} &lt;${data.email}&gt;</div>
            </div>
            ${data.company ? `
            <div class="field">
              <div class="label">Company</div>
              <div class="value">${data.company}</div>
            </div>
            ` : ''}
            ${data.role ? `
            <div class="field">
              <div class="label">Role/Position</div>
              <div class="value">${data.role}</div>
            </div>
            ` : ''}
            <div class="message-box">
              <div class="label">Message</div>
              <div class="value" style="white-space: pre-wrap;">${data.message}</div>
            </div>
            <div class="footer">
              Sent from your portfolio contact form at ${new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: Request) {
  try {
    const body: ContactRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message || !body.intent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const intentLabel = intentLabels[body.intent];
    const resend = getResend();

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: RECIPIENT_EMAIL,
      replyTo: body.email,
      subject: `[Portfolio] ${intentLabel} from ${body.name}`,
      html: generateEmailHtml(body),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
