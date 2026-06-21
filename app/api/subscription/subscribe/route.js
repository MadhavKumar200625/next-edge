import connectDB from '../../../../lib/mongodb';
import Candidate from '../../../../models/CandidateSchema';
import Employer from '../../../../models/EmployerSchema';
import mongoose from 'mongoose';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, token } = body;

    let userEmail = email;
    if (!userEmail && token) {
      try {
        userEmail = Buffer.from(String(token), 'base64').toString('ascii');
      } catch (e) {
        // ignore
      }
    }

    if (!userEmail) {
      return new Response(JSON.stringify({ error: 'email or token required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const candidate = await Candidate.findOne({ email: userEmail });
    if (!candidate) {
      return new Response(JSON.stringify({ error: 'Candidate not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    // mock subscription creation: set active plan for 30 days
    candidate.hasActivePlan = true;
    candidate.activeSubscriptionId = new mongoose.Types.ObjectId();
    candidate.planExpiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    // If candidate was referred and employer not yet credited, credit commission now
    if (candidate.referredByEmployerId && !candidate.commissionCredited) {
      const employer = await Employer.findById(candidate.referredByEmployerId);
      if (employer) {
        const commission = Number(employer.commissionPerSubscription || 9);
        employer.pendingCommission = (Number(employer.pendingCommission) || 0) + commission;
        employer.totalPaidSubscriptions = (Number(employer.totalPaidSubscriptions) || 0) + 1;
        employer.totalReferredCandidates = (Number(employer.totalReferredCandidates) || 0) + 1;
        await employer.save();

        candidate.commissionCredited = true;
      }
    }

    await candidate.save();

    return new Response(JSON.stringify({ ok: true, hasActivePlan: candidate.hasActivePlan, planExpiryDate: candidate.planExpiryDate }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
