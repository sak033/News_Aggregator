import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

export default async function sendContactEmail({
  name,
  email,
  inquiryType,
  subject,
  message,
}) {
  // OWNER EMAIL
  await transporter.sendMail({
    from: `"News Aggregator" <${process.env.BREVO_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: `📩 New Contact: ${subject}`,
    html: `
      <h3>New Contact Message</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Type:</b> ${inquiryType}</p>
      <p><b>Message:</b></p>
      <p>${message}</p>
    `,
  });

  // USER CONFIRMATION
  await transporter.sendMail({
    from: `"News Aggregator" <${process.env.BREVO_USER}>`,
    to: email,
    subject: "We received your message ✅",
    html: `
      <p>Hi ${name},</p>
      <p>Thanks for contacting us. We received your message and will reply soon.</p>
      <br/>
      <p>— News Aggregator Team</p>
    `,
  });
}
