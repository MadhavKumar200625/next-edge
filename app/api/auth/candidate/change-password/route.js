import connectDB from '../../../../../lib/mongodb';
import Candidate from '../../../../../models/CandidateSchema';

export async function POST(req) {
  try {
    await connectDB();
    const { email, currentPassword, newPassword } = await req.json();

    if (!email || !currentPassword || !newPassword) {
      return new Response(JSON.stringify({ error: 'email, currentPassword and newPassword are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const user = await Candidate.findOne({ email }).select('+password');
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const encodedCurrent = Buffer.from(String(currentPassword)).toString('base64');
    if (user.password !== encodedCurrent) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    user.password = Buffer.from(String(newPassword)).toString('base64');
    await user.save();

    return new Response(JSON.stringify({ ok: true, message: 'Password updated successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
