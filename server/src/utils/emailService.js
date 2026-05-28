const nodemailer = require('nodemailer');

let transporterPromise;

function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);
}

async function getTransporter() {
  if (!isSmtpConfigured()) {
    return null;
  }

  if (!transporterPromise) {
    transporterPromise = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  return transporterPromise;
}

async function sendPasswordResetEmail({ email, fullName, resetUrl }) {
  const from = process.env.SMTP_FROM || 'LMS Portal <noreply@campus.edu>';
  const subject = 'Reset your LMS Portal password';
  const text = [
    `Hello ${fullName || 'there'},`,
    '',
    'We received a request to reset your LMS Portal password.',
    `Use this link to choose a new password (expires in ${process.env.PASSWORD_RESET_TTL_MINUTES || 60} minutes):`,
    resetUrl,
    '',
    'If you did not request this, you can ignore this email.',
  ].join('\n');

  const html = `
    <p>Hello ${fullName || 'there'},</p>
    <p>We received a request to reset your LMS Portal password.</p>
    <p><a href="${resetUrl}">Reset your password</a></p>
    <p>This link expires in ${process.env.PASSWORD_RESET_TTL_MINUTES || 60} minutes.</p>
    <p>If you did not request this, you can ignore this email.</p>
  `;

  const transporter = await getTransporter();

  if (!transporter) {
    console.log('\n[LMS Password Reset — SMTP not configured]');
    console.log(`  To: ${email}`);
    console.log(`  Reset link: ${resetUrl}\n`);
    return { delivered: false };
  }

  await transporter.sendMail({
    from,
    to: email,
    subject,
    text,
    html,
  });

  return { delivered: true };
}

module.exports = {
  sendPasswordResetEmail,
  isSmtpConfigured,
};
