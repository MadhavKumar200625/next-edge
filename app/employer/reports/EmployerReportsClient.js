"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function EmployerReportsClient() {
  const searchParams = useSearchParams();
  const [employerId, setEmployerId] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    try {
      const queryId = searchParams?.get?.('employerId');
      if (queryId) {
        setEmployerId(queryId);
        return;
      }
    } catch (err) {}

    try {
      const e = typeof window !== 'undefined' && localStorage.getItem('employer');
      if (e) {
        const emp = JSON.parse(e);
        if (emp && emp.id) setEmployerId(emp.id);
      }
    } catch (err) {}
  }, [searchParams]);

  async function fetchData() {
    if (!employerId) {
      setError('Employer not signed in');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const body = { employerId };
      if (fromDate) body.fromDate = fromDate;
      if (toDate) body.toDate = toDate;
      if (month && year) {
        body.month = month;
        body.year = year;
      }

      const res = await fetch('/api/reports/employer/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || 'Failed');
      setData(d);
    } catch (err) {
      setError(String(err.message || err));
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-bold">Employer Reports</h1>
      <p className="mt-2 text-sm text-gray-600">Reports for your company — view by date range or month.</p>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4 items-end">
        <div>
          <label className="text-sm">From</label>
          <input
            type="date"
            className="mt-1 rounded border px-3 py-2 w-full"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm">To</label>
          <input
            type="date"
            className="mt-1 rounded border px-3 py-2 w-full"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm">Month</label>
          <select
            className="mt-1 rounded border px-3 py-2 w-full"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">—</option>
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm">Year</label>
          <input
            type="number"
            className="mt-1 rounded border px-3 py-2 w-full"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2024"
          />
        </div>
      </div>

      <div className="mt-4">
        <button className="rounded bg-[#0D1630] px-4 py-2 text-white" onClick={fetchData}>
          Load Reports
        </button>
      </div>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {data && data.ok && (
        <div className="mt-6 space-y-6">
          <div className="rounded-3xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Employer</h2>
            <p className="mt-1 text-sm text-gray-600">
              {data.employer?.fullName} — {data.employer?.email}
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-gray-100 bg-gray-50 p-4">
                <div className="text-sm text-gray-500">Jobs</div>
                <div className="mt-2 text-2xl font-black">{data.employer?.totalJobsPosted}</div>
              </div>
              <div className="rounded-3xl border border-gray-100 bg-gray-50 p-4">
                <div className="text-sm text-gray-500">Pending Commission</div>
                <div className="mt-2 text-2xl font-black">₹{data.employer?.pendingCommission}</div>
              </div>
              <div className="rounded-3xl border border-gray-100 bg-gray-50 p-4">
                <div className="text-sm text-gray-500">Total Earned</div>
                <div className="mt-2 text-2xl font-black">₹{data.employer?.totalCommissionEarned}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold">Jobs</h3>
            {data.jobs.length === 0 && <p className="mt-2 text-sm text-gray-600">No jobs found.</p>}
            <div className="mt-4 space-y-4">
              {data.jobs.map((job) => (
                <div key={job.jobId} className="rounded-3xl border bg-white p-4 shadow-sm">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-lg font-semibold text-[#0D1630]">{job.title}</div>
                      <div className="text-sm text-gray-600">{job.jobCode} — {job.totalApplications} applicants</div>
                    </div>
                  </div>

                  <div className="mt-3 space-y-3">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Recent Applicants</h4>
                    {job.applicants.length === 0 && <p className="text-sm text-gray-600">No applicants yet.</p>}
                    {job.applicants.map((a) => (
                      <div key={a.applicationId} className="rounded-2xl border border-gray-100 bg-gray-50 p-3">
                        <div className="text-sm font-semibold text-[#0D1630]">{a.candidate?.fullName || '—'}</div>
                        <div className="mt-1 text-xs text-gray-500">{a.candidate?.email || ''} • {a.status} • {new Date(a.appliedAt).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold">Referred Candidates (commission records)</h3>
            {data.referredCandidates.length === 0 && <p className="mt-2 text-sm text-gray-600">No referred candidates found.</p>}
            <div className="mt-4 space-y-3">
              {data.referredCandidates.map((c) => (
                <div key={c._id} className="rounded-3xl border bg-white p-4 shadow-sm">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm font-semibold text-[#0D1630]">{c.fullName}</div>
                      <div className="text-xs text-gray-500">Credited: {String(c.commissionCredited)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
