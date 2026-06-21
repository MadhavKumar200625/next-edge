import connectDB from '../../../../lib/mongodb';
import Employer from '../../../../models/EmployerSchema';

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    if (!email || !password) return new Response(JSON.stringify({ error: 'Email and password required' }), { status: 400 });

    const emp = await Employer.findOne({ email }).select('+password');
    if (!emp) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });

    const encoded = Buffer.from(password).toString('base64');
    if (emp.password !== encoded) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });

    try { await Employer.updateOne({ _id: emp._id }, { $set: { lastLoginAt: new Date() } }); } catch (e) {}

    const token = Buffer.from(`${emp.email}:employer`).toString('base64');
    return new Response(JSON.stringify({ ok: true, employer: { id: emp._id, email: emp.email, token } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500 });
  }
}
