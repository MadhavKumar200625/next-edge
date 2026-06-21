import connectDB from '../../../../lib/mongodb';
import Admin from '../../../../models/Admin';

export async function POST(req) {
  try {
    await connectDB();

    const { fullName, email, phone, password } = await req.json();

    if (!fullName || !email || !phone || !password) {
      return new Response(JSON.stringify({ error: 'fullName, email, phone and password are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const exists = await Admin.findOne({ $or: [{ email }, { phone }] });
    if (exists) {
      return new Response(JSON.stringify({ error: 'Admin with that email or phone already exists' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
    }

    const encoded = Buffer.from(password).toString('base64');

    const created = await Admin.create({
      fullName,
      email,
      phone,
      password: encoded,
      role: 'super_admin',
      permissions: ['all'],
      isActive: true,
    });

    const out = { id: created._id, fullName: created.fullName, email: created.email, phone: created.phone, role: created.role };

    return new Response(JSON.stringify({ ok: true, admin: out }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
