import nodemailer from "nodemailer";

// 1. Configure the transporter using environment variables for security
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT, 10) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Your email from a .env file
    pass: process.env.SMTP_PASS, // Your app password from a .env file
  },
});

/**
 * Sends an email using the configured transporter.
 * @param {object} options - The mail options.
 * @param {string} options.to - The recipient's email address.
 * @param {string} options.subject - The subject of the email.
 * @param {string} options.text - The plain-text body of the email.
 * @param {string} options.html - The HTML body of the email.
 * @returns {Promise<string>} The message ID of the sent email.
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"GEMX" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent:", info.messageId);
    return info.messageId;
  } catch (error) {
    console.error("Error sending email:", error);
    // In a real app, you might want to use a more sophisticated logger
    throw new Error("Failed to send email due to a server error.");
  }
};