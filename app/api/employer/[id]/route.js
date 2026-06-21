import connectDB from '../../../../lib/mongodb';
import Employer from '../../../../models/EmployerSchema';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'Invalid id' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const emp = await Employer.findById(id).select('-password').lean();
    if (!emp) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });

    return new Response(JSON.stringify({ ok: true, employer: emp }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
