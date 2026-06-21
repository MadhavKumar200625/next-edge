import connectDB from '../../../../lib/mongodb';
import Admin from '../../../../models/Admin';

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password required' }), { status: 400 });
    }

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });

    const encoded = Buffer.from(password).toString('base64');
    if (admin.password !== encoded) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });

    try { await Admin.updateOne({ _id: admin._id }, { $set: { lastLoginAt: new Date() } }); } catch (e) {}

    const token = Buffer.from(`${admin.email}:${admin.role}`).toString('base64');

    return new Response(JSON.stringify({ ok: true, admin: { id: admin._id, email: admin.email, role: admin.role, token } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500 });
  }
}
