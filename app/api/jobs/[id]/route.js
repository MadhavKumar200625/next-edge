import connectDB from "../../../../lib/mongodb";
import Job from "../../../../models/JobSchema";
import mongoose from "mongoose";

const hiddenFields = "-companyName -hrName -hrNumber -employerId";

export async function GET(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid job id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const job = await Job.findOne({
      _id: id,
      isActive: true,
      status: "active",
    })
      .select(hiddenFields)
      .lean();

    if (!job) {
      return new Response(JSON.stringify({ error: "Job not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, job }), {
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
