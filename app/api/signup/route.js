import connectDB from '../../../lib/mongodb';
import Candidate from '../../../models/CandidateSchema';

export async function POST(req) {
  try {
    await connectDB();

    const { fullName, email, phone, password, referralCode } = await req.json();

    if (!fullName || !email || !phone || !password) {
      return new Response(JSON.stringify({ error: 'fullName, email, phone and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // referral code is required for signup. If not provided, client should instruct user to contact support.
    if (!referralCode) {
      // TODO: replace with real support phone number in client UI
      return new Response(JSON.stringify({ error: 'Referral code required. Please contact support at /* PHONE_NUMBER_HERE */' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const exists = await Candidate.findOne({ $or: [{ email }, { phone }] });
    if (exists) {
      return new Response(JSON.stringify({ error: 'Email or phone already in use' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // verify referral code belongs to an approved employer
    const Employer = (await import('../../../models/EmployerSchema')).default;
    const employer = await Employer.findOne({ referralCode: referralCode, approvalStatus: 'approved' });
    if (!employer) {
      return new Response(JSON.stringify({ error: 'Invalid referral code. Please contact support at /* PHONE_NUMBER_HERE */' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const encoded = Buffer.from(password).toString('base64');

    const created = await Candidate.create({
      fullName,
      email,
      phone,
      password: encoded,
      referralCodeUsed: referralCode,
      referredByEmployerId: employer._id,
      hasActivePlan: false,
    });

    const token = Buffer.from(String(created.email)).toString('base64');

    const payload = { id: created._id, email: created.email, token, hasActivePlan: created.hasActivePlan };

    return new Response(JSON.stringify({ ok: true, user: payload }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
