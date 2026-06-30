import connectDB from '../../../lib/mongodb';
import Candidate from '../../../models/CandidateSchema';
import { signJwt } from '../../../lib/jwt';

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const user = await Candidate.findOne({ email }).select('+password');

    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    const encoded = Buffer.from(password).toString('base64');

    if (user.password !== encoded) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    try {
      await Candidate.updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } });
    } catch (e) {
      // non-fatal
    }

    const token = signJwt({
      id: String(user._id),
      email: user.email,
      role: 'candidate',
    });

    const payload = { id: user._id, email: user.email, token, fullName: user.fullName };

    return new Response(JSON.stringify({ ok: true, user: payload }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
