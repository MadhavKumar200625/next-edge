"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AdminEmployerReportPage() {
  const params = useParams();
  const router = useRouter();
  const employerId = params?.id;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (employerId) {
      fetchData();
    }
  }, [employerId]);

  async function fetchData() {
    if (!employerId) {
      setError("Employer ID is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const body = { employerId };
      if (fromDate) body.fromDate = fromDate;
      if (toDate) body.toDate = toDate;
      if (month && year) {
        body.month = month;
        body.year = year;
      }

      const res = await fetch("/api/reports/employer/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to load employer report.");
      setData(result);
    } catch (err) {
      setError(String(err.message || err));
    } finally {
      setLoading(false);
    }
  }

  const employerName = data?.employer?.fullName || "Employer";

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Admin Employer Report</h1>
          <p className="mt-2 text-sm text-gray-600">
            Viewing report details for employer {employerName}.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm"
          >
            Back
          </button>
          <Link href="/admin/reports" className="rounded bg-[#0D1630] px-4 py-2 text-sm font-semibold text-white">
            Admin reports
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
        <div>
          <label className="text-sm">From</label>
          <input type="date" className="mt-1 rounded border px-3 py-2 w-full" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div>
          <label className="text-sm">To</label>
          <input type="date" className="mt-1 rounded border px-3 py-2 w-full" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        <div>
          <label className="text-sm">Month</label>
          <select className="mt-1 rounded border px-3 py-2 w-full" value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">—</option>
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm">Year</label>
          <input type="number" className="mt-1 rounded border px-3 py-2 w-full" value={year} onChange={(e) => setYear(e.target.value)} placeholder="2024" />
        </div>
      </div>

      <div className="mt-4">
        <button className="rounded bg-[#0D1630] px-4 py-2 text-white" onClick={fetchData}>
          Refresh
        </button>
      </div>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {data && data.ok && (
        <div className="mt-6 space-y-6">
          <div className="rounded border bg-white p-5">
            <h2 className="text-lg font-bold">Employer Summary</h2>
            <p className="mt-2 text-sm text-gray-600">{data.employer?.fullName} — {data.employer?.email}</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded border p-4">
                <div className="text-sm text-gray-500">Jobs</div>
                <div className="mt-2 text-2xl font-black">{data.employer?.totalJobsPosted}</div>
              </div>
              <div className="rounded border p-4">
                <div className="text-sm text-gray-500">Pending Commission</div>
                <div className="mt-2 text-2xl font-black">₹{data.employer?.pendingCommission}</div>
              </div>
              <div className="rounded border p-4">
                <div className="text-sm text-gray-500">Total Earned</div>
                <div className="mt-2 text-2xl font-black">₹{data.employer?.totalCommissionEarned}</div>
              </div>
            </div>
          </div>

          <div className="rounded border bg-white p-5">
            <h3 className="text-lg font-bold">Jobs</h3>
            {data.jobs?.length === 0 ? (
              <p className="mt-3 text-sm text-gray-600">No jobs found for this employer.</p>
            ) : (
              <div className="mt-4 space-y-4">
                {data.jobs.map((job) => (
                  <div key={job.jobId} className="rounded border p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-lg font-semibold">{job.title}</div>
                        <div className="text-sm text-gray-600">{job.jobCode}</div>
                      </div>
                      <div className="text-sm text-gray-600">{job.totalApplications} applicants</div>
                    </div>
                    <div className="mt-3">
                      <h4 className="font-semibold">Recent Applicants</h4>
                      {job.applicants.length === 0 ? (
                        <p className="mt-2 text-sm text-gray-600">No applicants yet.</p>
                      ) : (
                        <div className="mt-3 space-y-3">
                          {job.applicants.map((a) => (
                            <div key={a.applicationId} className="rounded border-t pt-3">
                              <div className="font-semibold">{a.candidate?.fullName || "Unknown"}</div>
                              <div className="text-xs text-gray-500">{a.candidate?.email || ""} • {a.status} • {new Date(a.appliedAt).toLocaleString()}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded border bg-white p-5">
            <h3 className="text-lg font-bold">Referred Candidates</h3>
            {data.referredCandidates?.length === 0 ? (
              <p className="mt-3 text-sm text-gray-600">No referred candidates found.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {data.referredCandidates.map((c) => (
                  <div key={c._id} className="rounded border-t pt-3">
                    <div className="font-semibold">{c.fullName}</div>
                    <div className="text-xs text-gray-500">{c.email} • commission credited: ₹{c.commissionCredited}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
