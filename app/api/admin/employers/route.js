import connectDB from "../../../../lib/mongodb";
import { requireAdmin } from "../../../../lib/adminAuth";
import Employer from "../../../../models/EmployerSchema";

export async function GET(req) {
  try {
    await connectDB();

    const { error } = await requireAdmin(req);
    if (error) return error;

    const employers = await Employer.find({})
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(1000)
      .lean();

    return new Response(JSON.stringify({ ok: true, employers }), {
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
