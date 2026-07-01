import connectDB from '../../../../../lib/mongodb';
import Employer from '../../../../../models/EmployerSchema';
import Job from '../../../../../models/JobSchema';
import Application from '../../../../../models/ApplicationSchma';

export async function GET(req) {
  try {
    await connectDB();

    // allow optional date filters via query string: fromDate, toDate, month, year
    const url = new URL(req.url);
    const fromDate = url.searchParams.get('fromDate');
    const toDate = url.searchParams.get('toDate');
    const month = url.searchParams.get('month');
    const year = url.searchParams.get('year');

    let dateFilter = null;
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

    const employers = await Employer.find().lean();

    const rows = await Promise.all(
      employers.map(async (emp) => {
        const totalJobs = await Job.countDocuments({ employerId: emp._id });
        let totalApplicants = await Application.countDocuments({ employerId: emp._id });

        if (dateFilter) {
          totalApplicants = await Application.countDocuments({ employerId: emp._id, appliedAt: dateFilter });
        }

        return {
          id: emp._id,
          fullName: emp.fullName,
          email: emp.email,
          totalJobsPosted: emp.totalJobsPosted || totalJobs,
          totalApplicants,
          pendingCommission: emp.pendingCommission || 0,
          totalCommissionPaid: emp.totalCommissionPaid || 0,
          totalCommissionEarned:
            Number(emp.pendingCommission || 0) + Number(emp.totalCommissionPaid || 0),
        };
      })
    );

    return new Response(JSON.stringify({ ok: true, rows }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500 });
  }
}
