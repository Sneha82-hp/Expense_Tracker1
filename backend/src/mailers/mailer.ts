import { Env } from "../config/env.config";
import { resend } from "../config/resend.config";

type Params = {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  from?: string;
};

const mailer_sender = `Expenza <${Env.RESEND_MAILER_SENDER || "onboarding@resend.dev"}>`;

export const sendEmail = async ({
  to,
  from = mailer_sender,
  subject,
  text,
  html,
}: Params) => {
  try {
    console.log("📨 Sending email via Resend...");
    console.log("➡️ To:", to);
    console.log("➡️ From:", from);
    console.log("➡️ Subject:", subject);

    const response = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      text,
      html,
    });

    console.log("✅ Email sent successfully:", response?.data || response);
    return response;
  } catch (error: any) {
    console.error("❌ Email sending failed:", error?.message || error);
    if (error?.response) console.error("Resend response:", error.response);
    throw error;
  }
};
