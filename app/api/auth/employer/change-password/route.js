import connectDB from '../../../../../lib/mongodb';
import Employer from '../../../../../models/EmployerSchema';

export async function POST(req) {
  try {
    await connectDB();
    const { email, currentPassword, newPassword } = await req.json();

    if (!email || !currentPassword || !newPassword) {
      return new Response(JSON.stringify({ error: 'email, currentPassword and newPassword are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const employer = await Employer.findOne({ email }).select('+password');
    if (!employer) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const encodedCurrent = Buffer.from(String(currentPassword)).toString('base64');
    if (employer.password !== encodedCurrent) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    employer.password = Buffer.from(String(newPassword)).toString('base64');
    await employer.save();

    return new Response(JSON.stringify({ ok: true, message: 'Password updated successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
