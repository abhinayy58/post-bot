import { resend } from "../config/mailer.js";

export async function sendVideoEmail({
  caption,
  hashtags,
  videoLink
}) {
  const text =
    `${caption}\n\n${hashtags.join(" ")}\n\n🎥 Video Link:\n${videoLink}`;

  await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: "🎬 New Telegram Video",
    text
  });
}
