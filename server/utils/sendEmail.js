import { Resend } from "resend";

export default async function sendWelcomeEmail(toEmail) {
  console.log("📨 sendWelcomeEmail CALLED with:", toEmail);

  const resend = new Resend(process.env.RESEND_API_KEY); // ✅ moved here

  try {
    await resend.emails.send({
      from: "News Aggregator <onboarding@resend.dev>",
      to: toEmail,
      subject: "Welcome to News Aggregator 📰",
      html: `
        <h2>Thanks for subscribing!</h2>
        <p>You’ll now receive breaking news and trending updates.</p>
        <p>– Team News Aggregator</p>
      `,
    });

    console.log("✅ Welcome email sent");
  } catch (error) {
    console.error("❌ Welcome email failed:", error);
  }
}
