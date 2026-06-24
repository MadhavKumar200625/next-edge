import connectDB from "../../../../lib/mongodb";
import { requireAdmin } from "../../../../lib/adminAuth";
import Job from "../../../../models/JobSchema";

export async function GET(req) {
  try {
    await connectDB();

    const { error } = await requireAdmin(req);
    if (error) return error;

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "all";
    const filter = {};

    if (status === "inactive") {
      filter.isActive = false;
    } else if (status === "active") {
      filter.isActive = true;
      filter.status = "active";
    }

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .limit(1000)
      .lean();

    return new Response(JSON.stringify({ ok: true, jobs }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
