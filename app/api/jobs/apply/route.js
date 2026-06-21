import connectDB from '../../../../lib/mongodb';
import Job from '../../../../models/JobSchema';
import Candidate from '../../../../models/CandidateSchema';
import Employer from '../../../../models/EmployerSchema';
import Application from '../../../../models/ApplicationSchma';
import mongoose from 'mongoose';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { jobId, token, email } = body;

    if (!jobId) {
      return new Response(JSON.stringify({ error: 'jobId is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    let userEmail = email;
    if (!userEmail && token) {
      try {
        userEmail = Buffer.from(String(token), 'base64').toString('ascii');
      } catch (e) {}
    }

    if (!userEmail) {
      return new Response(JSON.stringify({ error: 'candidate email or token required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const candidate = await Candidate.findOne({ email: userEmail });
    if (!candidate) {
      return new Response(JSON.stringify({ error: 'Candidate not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    // check active subscription
    if (!candidate.hasActivePlan || !candidate.planExpiryDate || new Date(candidate.planExpiryDate) < new Date()) {
      return new Response(JSON.stringify({ error: 'Active subscription required. Please purchase the 99 INR monthly plan.' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
    }

    // find job
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return new Response(JSON.stringify({ error: 'Invalid jobId' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return new Response(JSON.stringify({ error: 'Job not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    // credit commission on first paid action if applicable
    if (candidate.referredByEmployerId && !candidate.commissionCredited) {
      const employer = await Employer.findById(candidate.referredByEmployerId);
      if (employer) {
        const commission = Number(employer.commissionPerSubscription || 9);
        employer.pendingCommission = (Number(employer.pendingCommission) || 0) + commission;
        employer.totalReferredCandidates = (Number(employer.totalReferredCandidates) || 0) + 1;
        await employer.save();

        candidate.commissionCredited = true;
        await candidate.save();
      }
    }

    // create application record
    const application = await Application.create({
      jobId: job._id,
      employerId: job.employerId || null,
      candidateId: candidate._id,
      applicationCode: `APP-${Date.now()}-${Math.floor(Math.random() * 9000) + 1000}`,
    });

    return new Response(JSON.stringify({ ok: true, applicationId: application._id }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
