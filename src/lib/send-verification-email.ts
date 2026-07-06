import { Resend } from "resend";

type SendVerificationEmailInput = {
  email: string;
  name: string;
  url: string;
};

function buildVerificationEmailHtml({
  name,
  url,
}: Omit<SendVerificationEmailInput, "email">) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #111827;">
      <p style="font-size: 14px; color: #6b7280; margin: 0 0 8px;">MedicareLab</p>
      <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 16px;">Verify your email</h1>
      <p style="font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
        Hi ${name},<br />
        Thanks for signing up. Please confirm your email address to continue setting up your laboratory workspace.
      </p>
      <a
        href="${url}"
        style="display: inline-block; background: #0f766e; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px; padding: 12px 20px; border-radius: 10px;"
      >
        Verify email address
      </a>
      <p style="font-size: 13px; line-height: 1.6; color: #6b7280; margin: 24px 0 0;">
        If the button does not work, copy and paste this link into your browser:<br />
        <a href="${url}" style="color: #0f766e; word-break: break-all;">${url}</a>
      </p>
      <p style="font-size: 13px; line-height: 1.6; color: #6b7280; margin: 16px 0 0;">
        If you did not create an account, you can safely ignore this email.
      </p>
    </div>
  `;
}

function buildVerificationEmailText({
  name,
  url,
}: Omit<SendVerificationEmailInput, "email">) {
  return `Hi ${name},

Thanks for signing up for MedicareLab.

Verify your email by opening this link:
${url}

If you did not create an account, you can safely ignore this email.`;
}

export async function sendAuthVerificationEmail({
  email,
  name,
  url,
}: SendVerificationEmailInput) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();

  if (!apiKey) {
    const message = "RESEND_API_KEY is not configured.";
    console.error(`[email] ${message}`);
    throw new Error(message);
  }

  if (!from) {
    const message = "RESEND_FROM_EMAIL is not configured.";
    console.error(`[email] ${message}`);
    throw new Error(message);
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to: email,
    subject: "Verify your MedicareLab account",
    html: buildVerificationEmailHtml({ name, url }),
    text: buildVerificationEmailText({ name, url }),
  });

  if (error) {
    console.error("[email] Resend API error:", error);
    throw new Error(error.message || "Failed to send verification email.");
  }

  console.info("[email] Verification email sent", {
    id: data?.id,
    to: email,
    from,
  });

  return data;
}