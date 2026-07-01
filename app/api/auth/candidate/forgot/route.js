import connectDB from '../../../../../lib/mongodb';
import Candidate from '../../../../../models/CandidateSchema';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();
    if (!email) return new Response(JSON.stringify({ error: 'Email required' }), { status: 400 });

    const user = await Candidate.findOne({ email });
    if (!user) return new Response(JSON.stringify({ ok: true }), { status: 200 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
      });

      const mailOptions = {
        from: process.env.EMAIL_FROM || 'no-reply@nextedge.test',
        to: user.email,
        subject: 'Password reset OTP',
        text: `Your password reset OTP is ${otp}. It expires in 10 minutes. If you didn't request this, ignore this email.`,
      };

      await transporter.sendMail(mailOptions);
    } catch (e) {
      console.error('Failed to send reset email', e?.message || e);
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500 });
  }
}
