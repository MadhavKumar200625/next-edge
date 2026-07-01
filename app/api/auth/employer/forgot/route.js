import connectDB from '../../../../../lib/mongodb';
import Employer from '../../../../../models/EmployerSchema';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();
    if (!email) return new Response(JSON.stringify({ error: 'Email required' }), { status: 400 });

    const emp = await Employer.findOne({ email });
    if (!emp) return new Response(JSON.stringify({ ok: true }), { status: 200 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    emp.resetOtp = otp;
    emp.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await emp.save();

    // send email via nodemailer if configured
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
      });

      const mailOptions = {
        from: process.env.EMAIL_FROM || 'no-reply@nextedge.test',
        to: emp.email,
        subject: 'Password reset OTP',
        text: `Your password reset OTP is ${otp}. It expires in 10 minutes. If you didn't request this, ignore this email.`,
      };

      await transporter.sendMail(mailOptions);
    } catch (e) {
      // swallow email errors but keep OTP persisted
      console.error('Failed to send reset email', e?.message || e);
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500 });
  }
}
