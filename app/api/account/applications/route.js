import connectDB from "../../../../lib/mongodb";
import Candidate from "../../../../models/CandidateSchema";
import Application from "../../../../models/ApplicationSchma";
import { getCandidateIdentity } from "../../../../lib/jwt";

export async function POST(req) {
  try {
    await connectDB();

    const { token } = await req.json();
    const identity = getCandidateIdentity({ token });

    if (!identity?.email) {
      return new Response(JSON.stringify({ error: "Login required" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const candidate = await Candidate.findOne({ email: identity.email }).lean();
    if (!candidate) {
      return new Response(JSON.stringify({ error: "Candidate not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const applications = await Application.find({ candidateId: candidate._id })
      .populate("jobId", "title positionName location city state workMode employmentType salaryRange publishedAt")
      .sort({ appliedAt: -1 })
      .lean();

    return new Response(
      JSON.stringify({
        ok: true,
        candidate: {
          id: candidate._id,
          fullName: candidate.fullName,
          email: candidate.email,
          phone: candidate.phone,
          hasActivePlan: candidate.hasActivePlan,
          planExpiryDate: candidate.planExpiryDate,
        },
        applications,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
