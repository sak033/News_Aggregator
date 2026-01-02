import nodemailer from "nodemailer";





const sendContactEmail = async ({ name, email, inquiryType, subject, message }) => {

    const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

  // Email to YOU (admin)
  await transporter.sendMail({
    from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `📩 New Contact Message: ${subject}`,
    html: `
      <h3>New Contact Message</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Inquiry:</b> ${inquiryType}</p>
      <p><b>Message:</b></p>
      <p>${message}</p>
    `,
  });

  // Optional auto-reply to user
  await transporter.sendMail({
    from: `"News Aggregator" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "We received your message ✅",
    html: `
      <p>Hi ${name},</p>
      <p>Thanks for contacting News Aggregator.</p>
      <p>We have received your message and will get back to you soon.</p>
      <br/>
      <p>— Team News Aggregator</p>
    `,
  });
};

export default sendContactEmail;
