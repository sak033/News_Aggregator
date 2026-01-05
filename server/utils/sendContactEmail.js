import { Resend } from "resend";

export default async function sendContactEmail({
  name,
  email,
  inquiryType,
  subject,
  message,
}) {
  console.log("📨 sendContactEmail CALLED:", email);
  const resend = new Resend(process.env.RESEND_API_KEY); // ✅ moved here

  try {
    // Mail to owner
    await resend.emails.send({
      from: "News Aggregator <contact@resend.dev>",
      to: process.env.OWNER_EMAIL,
      subject: `📬 New Contact Message: ${subject}`,
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Type:</b> ${inquiryType}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    // Confirmation to user
    await resend.emails.send({
      from: "News Aggregator <contact@resend.dev>",
      to: email,
      subject: "We received your message ✅",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for contacting <b>News Aggregator</b>.</p>
        <p>We’ve received your message and will get back to you soon.</p>
        <br/>
        <p>— News Aggregator Team</p>
      `,
    });

    console.log("✅ Contact emails sent");
  } catch (error) {
    console.error("❌ Contact email failed:", error);
    throw error;
  }
}
