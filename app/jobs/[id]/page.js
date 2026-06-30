"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Detail({ label, value }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div className="border border-gray-100 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
        {label}
      </p>
      <p className="mt-2 text-[#0D1630]">
        {Array.isArray(value) ? value.join(", ") : value}
      </p>
    </div>
  );
}

export default function JobDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const user = typeof window !== "undefined" && localStorage.getItem("user");
    if (!user) {
      router.replace("/login");
      return;
    }

    async function loadJob() {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();
        if (res.ok) setJob(data.job);
        else setMessage(data.error || "Job not found");
      } catch (err) {
        setMessage(String(err.message || err));
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, [id, router]);

  async function applyToJob() {
    if (!window.confirm("Are you sure you want to apply for this job?")) return;

    setApplying(true);
    setMessage("");

    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const res = await fetch("/api/jobs/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: id, token: user?.token }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Could not apply");
        setApplying(false);
        return;
      }

      setMessage("Job successfully applied.");
    } catch (err) {
      setMessage(String(err.message || err));
    }

    setApplying(false);
  }

  if (loading) {
    return <div className="mx-auto max-w-5xl px-6 py-12 text-gray-600">Loading job...</div>;
  }

  if (!job) {
    return <div className="mx-auto max-w-5xl px-6 py-12 text-gray-600">{message || "Job not found."}</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-4xl font-black text-[#0D1630]">
            {job.positionName || job.title}
          </h1>
          <p className="mt-3 text-lg text-gray-600">{job.location}</p>
        </div>
        <button
          type="button"
          onClick={applyToJob}
          disabled={applying}
          className="rounded-full bg-[#6F925C] px-7 py-3 font-bold text-white disabled:opacity-60"
        >
          {applying ? "Applying..." : "Apply"}
        </button>
      </div>

      {message && (
        <div className="mb-6 border border-[#6F925C]/20 bg-[#F1F7F0] px-4 py-3 text-sm font-semibold text-[#2d4a2b]">
          {message}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Detail label="Preferred Candidates" value={job.preferredCandidates} />
        <Detail label="Notice Period" value={job.noticePeriod} />
        <Detail label="Employment Type" value={job.employmentType} />
        <Detail label="Number of Openings" value={job.vacancies} />
        <Detail label="Salary Range / Budget" value={job.salaryRange || `${job.salaryMin || ""} - ${job.salaryMax || ""}`} />
        <Detail label="Experience Required" value={`${job.experienceMin || 0} years`} />
        <Detail label="Educational Qualification Required" value={job.qualificationRequired} />
        <Detail label="Key Skills Required" value={job.skillsRequired} />
        <Detail label="Work Mode" value={job.workMode} />
        <Detail label="Working Days" value={job.workingDays} />
        <Detail label="Shift Timing" value={job.shiftTiming} />
        <Detail label="Industry" value={job.industry} />
        <Detail label="Cab Facility" value={job.cabFacility} />
        <Detail label="Meal Facility" value={job.mealFacility} />
        <Detail label="Required Software/Tools Knowledge" value={job.requiredSoftwareTools} />
        <Detail label="Languages Required" value={job.languagesRequired} />
      </div>

      <section className="mt-8 border border-gray-100 bg-white p-6">
        <h2 className="text-xl font-bold text-[#0D1630]">Job Description</h2>
        <p className="mt-3 whitespace-pre-line leading-7 text-gray-700">{job.description}</p>
      </section>

      <section className="mt-6 border border-gray-100 bg-white p-6">
        <h2 className="text-xl font-bold text-[#0D1630]">Interview Process</h2>
        <p className="mt-3 whitespace-pre-line leading-7 text-gray-700">{job.interviewProcess}</p>
      </section>
    </div>
  );
}
