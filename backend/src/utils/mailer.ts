import nodemailer from 'nodemailer';

const host = process.env.MAIL_HOST || 'smtp.gmail.com';
const port = process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 465;
const user = process.env.EMAIL_USER as string;
const pass = process.env.EMAIL_PASS as string;
const from = process.env.MAIL_FROM || user;

if (!user || !pass) {
  // eslint-disable-next-line no-console
  console.warn('EMAIL_USER/EMAIL_PASS not set. Mailer will fail to send emails.');
}

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465, // true for 465, false for 587/others
  auth: { user, pass }
});

export async function sendMail(options: { to: string; subject: string; text?: string; html?: string }) {
  const info = await transporter.sendMail({
    from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  });
  return info;
}

export async function sendOtpEmail(to: string, otp: string, purpose: 'login' | 'signup') {
  const subject = `Your ${purpose === 'signup' ? 'Signup' : 'Login'} OTP`;
  const text = `Your OTP is ${otp}. It expires in 10 minutes.`;
  const html = `<p>Your OTP is <b style="font-size:18px">${otp}</b>.</p><p>It expires in 10 minutes.</p>`;
  return sendMail({ to, subject, text, html });
}
