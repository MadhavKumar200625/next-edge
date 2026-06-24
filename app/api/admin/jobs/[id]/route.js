import connectDB from "../../../../../lib/mongodb";
import { requireAdmin } from "../../../../../lib/adminAuth";
import Job from "../../../../../models/JobSchema";
import Employer from "../../../../../models/EmployerSchema";
import mongoose from "mongoose";

function jobCounters(job, nextIsActive, nextStatus) {
  const wasActive = job.isActive && job.status === "active";
  const willBeActive = nextIsActive && nextStatus === "active";

  if (wasActive === willBeActive) return null;
  return willBeActive
    ? { $inc: { activeJobsCount: 1 } }
    : { $inc: { activeJobsCount: -1 } };
}

export async function PATCH(req, context) {
  try {
    await connectDB();

    const { error } = await requireAdmin(req);
    if (error) return error;

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid job id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const job = await Job.findById(id);

    if (!job) {
      return new Response(JSON.stringify({ error: "Job not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const nextIsActive =
      typeof body.isActive === "boolean" ? body.isActive : job.isActive;
    const nextStatus =
      typeof body.status === "string" ? body.status : nextIsActive ? "active" : "draft";

    const counterUpdate = jobCounters(job, nextIsActive, nextStatus);

    job.isActive = nextIsActive;
    job.status = nextStatus;
    job.publishedAt = nextIsActive ? job.publishedAt || new Date() : job.publishedAt;
    job.closedAt = nextStatus === "closed" ? new Date() : null;
    await job.save();

    if (counterUpdate) {
      await Employer.updateOne({ _id: job.employerId }, counterUpdate);
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

export async function DELETE(req, context) {
  try {
    await connectDB();

    const { error } = await requireAdmin(req, { superOnly: true });
    if (error) return error;

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid job id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      return new Response(JSON.stringify({ error: "Job not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (job.isActive && job.status === "active") {
      await Employer.updateOne(
        { _id: job.employerId },
        { $inc: { activeJobsCount: -1, totalJobsPosted: -1 } }
      );
    } else {
      await Employer.updateOne(
        { _id: job.employerId },
        { $inc: { totalJobsPosted: -1 } }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
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
