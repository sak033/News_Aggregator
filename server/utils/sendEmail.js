import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWelcomeEmail = async (toEmail) => {
  await transporter.sendMail({
    from: `"News Aggregator" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Welcome to News Aggregator 📰",
    html: `
      <h2>Thanks for subscribing!</h2>
      <p>You’ll now receive breaking news and trending updates.</p>
      <p>– Team News Aggregator</p>
    `,
  });
};

export default sendWelcomeEmail;
