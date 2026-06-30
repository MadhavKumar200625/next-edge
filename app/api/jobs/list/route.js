import connectDB from '../../../../lib/mongodb';
import Job from '../../../../models/JobSchema';

export async function GET(req) {
  try {
    await connectDB();

    // return active jobs; explicitly exclude private employer details
    const jobs = await Job.find({ isActive: true, status: 'active' })
      .select('-companyName -hrName -hrNumber -employerId')
      .sort({ publishedAt: -1 })
      .limit(500)
      .lean();

    return new Response(JSON.stringify({ ok: true, jobs }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
