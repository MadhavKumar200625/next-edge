import connectDB from '../../../../../lib/mongodb';
import Employer from '../../../../../models/EmployerSchema';

export async function POST(req) {
  try {
    await connectDB();
    const { email, otp, newPassword } = await req.json();
    if (!email || !otp || !newPassword) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });

    const emp = await Employer.findOne({ email }).select('+resetOtp +resetOtpExpires +password');
    if (!emp) return new Response(JSON.stringify({ error: 'Invalid or expired OTP' }), { status: 400 });

    if (!emp.resetOtp || String(emp.resetOtp) !== String(otp)) return new Response(JSON.stringify({ error: 'Invalid or expired OTP' }), { status: 400 });
    if (!emp.resetOtpExpires || new Date(emp.resetOtpExpires) < new Date()) return new Response(JSON.stringify({ error: 'OTP expired' }), { status: 400 });

    // update password (site stores base64-encoded passwords)
    const encoded = Buffer.from(newPassword).toString('base64');
    emp.password = encoded;
    emp.resetOtp = null;
    emp.resetOtpExpires = null;
    await emp.save();

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500 });
  }
}
