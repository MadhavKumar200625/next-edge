import connectDB from '../../../../lib/mongodb';
import Employer from '../../../../models/EmployerSchema';

function makeBase(fullName) {
  const parts = String(fullName || '').trim().split(/\s+/);
  const first = (parts[0] || '').toUpperCase();
  const lastInitial = parts[1] ? parts[1][0].toUpperCase() : 'X';
  return `${first}${lastInitial}`;
}

function pad(n) {
  return String(n).padStart(3, '0');
}

export async function POST(req) {
  try {
    await connectDB();
    const { fullName, email, phone, password } = await req.json();
    if (!fullName || !email || !phone || !password) {
      return new Response(JSON.stringify({ error: 'fullName,email,phone,password required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const exists = await Employer.findOne({ $or: [{ email }, { phone }] });
    if (exists) return new Response(JSON.stringify({ error: 'Email or phone already in use' }), { status: 409, headers: { 'Content-Type': 'application/json' } });

    const base = makeBase(fullName);

    // compute next sequence for this base
    const regex = new RegExp('^' + base);
    const count = await Employer.countDocuments({ referralCode: { $regex: regex } });
    let seq = count + 1;
    let referral = `${base}${pad(seq)}`;
    // ensure uniqueness (small loop)
    while (await Employer.findOne({ referralCode: referral })) {
      seq += 1;
      referral = `${base}${pad(seq)}`;
    }

    const encoded = Buffer.from(password).toString('base64');

    const created = await Employer.create({ fullName, email, phone, password: encoded, referralCode: referral, approvalStatus: 'approved', isActive: true });

    return new Response(JSON.stringify({ ok: true, employer: { id: created._id, email: created.email, referralCode: created.referralCode } }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
