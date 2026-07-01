import connectDB from '../../../../../lib/mongodb';
import Candidate from '../../../../../models/CandidateSchema';

export async function POST(req) {
  try {
    await connectDB();
    const { email, otp, newPassword } = await req.json();
    if (!email || !otp || !newPassword) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });

    const user = await Candidate.findOne({ email }).select('+resetOtp +resetOtpExpires +password');
    if (!user) return new Response(JSON.stringify({ error: 'Invalid or expired OTP' }), { status: 400 });

    if (!user.resetOtp || String(user.resetOtp) !== String(otp)) return new Response(JSON.stringify({ error: 'Invalid or expired OTP' }), { status: 400 });
    if (!user.resetOtpExpires || new Date(user.resetOtpExpires) < new Date()) return new Response(JSON.stringify({ error: 'OTP expired' }), { status: 400 });

    const encoded = Buffer.from(newPassword).toString('base64');
    user.password = encoded;
    user.resetOtp = null;
    user.resetOtpExpires = null;
    await user.save();

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500 });
  }
}
