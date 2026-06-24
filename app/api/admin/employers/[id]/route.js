import connectDB from "../../../../../lib/mongodb";
import { requireAdmin } from "../../../../../lib/adminAuth";
import Employer from "../../../../../models/EmployerSchema";
import Job from "../../../../../models/JobSchema";
import mongoose from "mongoose";

export async function PATCH(req, context) {
  try {
    await connectDB();

    const { admin, error } = await requireAdmin(req);
    if (error) return error;

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid employer id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const update = {};

    if (typeof body.isActive === "boolean") update.isActive = body.isActive;

    if (
      ["pending", "approved", "rejected"].includes(body.approvalStatus)
    ) {
      update.approvalStatus = body.approvalStatus;
      if (body.approvalStatus === "approved") {
        update.approvedAt = new Date();
        update.approvedBy = admin._id;
      } else {
        update.approvedAt = null;
        update.approvedBy = null;
      }
    }

    if (typeof body.unlimitedJobPosting === "boolean") {
      update.unlimitedJobPosting = body.unlimitedJobPosting;
    }

    if (body.jobPostingLimit !== undefined) {
      update.jobPostingLimit = Number(body.jobPostingLimit) || 0;
    }

    const employer = await Employer.findByIdAndUpdate(id, update, {
      new: true,
    })
      .select("-password")
      .lean();

    if (!employer) {
      return new Response(JSON.stringify({ error: "Employer not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, employer }), {
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
      return new Response(JSON.stringify({ error: "Invalid employer id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const employer = await Employer.findByIdAndDelete(id);
    if (!employer) {
      return new Response(JSON.stringify({ error: "Employer not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await Job.deleteMany({ employerId: employer._id });

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
