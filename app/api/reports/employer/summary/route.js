import connectDB from '../../../../../lib/mongodb';
import Job from '../../../../../models/JobSchema';
import Application from '../../../../../models/ApplicationSchma';
import Employer from '../../../../../models/EmployerSchema';
import Candidate from '../../../../../models/CandidateSchema';

export async function POST(req) {
  try {
    await connectDB();
    const { employerId, fromDate, toDate, month, year } = await req.json();
    if (!employerId) return new Response(JSON.stringify({ error: 'employerId required' }), { status: 400 });

    const jobs = await Job.find({ employerId }).lean();

    // build date filter for applications
    let dateFilter = {};
    if (month && year) {
      const m = Number(month) - 1;
      const y = Number(year);
      const start = new Date(Date.UTC(y, m, 1));
      const end = new Date(Date.UTC(y, m + 1, 1));
      dateFilter = { $gte: start, $lt: end };
    } else if (fromDate || toDate) {
      const start = fromDate ? new Date(fromDate) : new Date(0);
      const end = toDate ? new Date(toDate) : new Date();
      dateFilter = { $gte: start, $lte: end };
    }

    const jobReports = await Promise.all(
      jobs.map(async (job) => {
        const appQuery = { jobId: job._id };
        if (Object.keys(dateFilter).length) appQuery.appliedAt = dateFilter;

        const applicants = await Application.find(appQuery)
          .sort({ appliedAt: -1 })
          .limit(200)
          .populate('candidateId', 'fullName email phone')
          .lean();

        return {
          jobId: job._id,
          jobCode: job.jobCode,
          title: job.title,
          totalApplications: job.totalApplications || applicants.length,
          applicants: applicants.map((a) => ({
            applicationId: a._id,
            status: a.status,
            appliedAt: a.appliedAt,
            candidate: a.candidateId ? { id: a.candidateId._id, fullName: a.candidateId.fullName, email: a.candidateId.email, phone: a.candidateId.phone } : null,
          })),
        };
      })
    );

    const employer = await Employer.findById(employerId).lean();
    const referredQuery = { referredByEmployerId: employerId };
    if (Object.keys(dateFilter).length) referredQuery.createdAt = dateFilter;
    const referredCandidates = await Candidate.find(referredQuery)
      .select('fullName email phone commissionCredited createdAt')
      .lean();

    return new Response(
      JSON.stringify({
        ok: true,
        employer: employer
          ? {
              id: employer._id,
              fullName: employer.fullName,
              email: employer.email,
              totalJobsPosted: employer.totalJobsPosted || jobs.length,
              pendingCommission: employer.pendingCommission || 0,
              totalCommissionPaid: employer.totalCommissionPaid || 0,
              totalCommissionEarned:
                Number(employer.pendingCommission || 0) + Number(employer.totalCommissionPaid || 0),
            }
          : null,
        jobs: jobReports,
        referredCandidates,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500 });
  }
}
