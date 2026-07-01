import connectDB from '../../../../../lib/mongodb';
import Candidate from '../../../../../models/CandidateSchema';
import Employer from '../../../../../models/EmployerSchema';

export async function POST(req) {
  try {
    await connectDB();
    const { employerId, fromDate, toDate, month, year } = await req.json();
    if (!employerId) return new Response(JSON.stringify({ error: 'employerId required' }), { status: 400 });

    // date filter on candidate createdAt
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

    const q = { referredByEmployerId: employerId };
    if (Object.keys(dateFilter).length) q.createdAt = dateFilter;

    const candidates = await Candidate.find(q).select('fullName email phone commissionCredited createdAt').sort({ createdAt: -1 }).lean();

    const employer = await Employer.findById(employerId).lean();
    const commissionPer = employer?.commissionPerSubscription ?? 0;

    // compute totals
    let totalCredited = 0;
    let totalPending = 0;
    candidates.forEach(c => {
      if (c.commissionCredited) totalCredited += commissionPer;
      else totalPending += commissionPer;
    });

    return new Response(JSON.stringify({ ok: true, commissionPer, candidates, totals: { totalCredited, totalPending, count: candidates.length } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500 });
  }
}
