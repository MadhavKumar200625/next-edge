"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CandidateDetailModal from '../../../components/CandidateDetailModal';

export default function EmployerCommissionsClient() {
  const searchParams = useSearchParams();
  const [employerId, setEmployerId] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [totals, setTotals] = useState(null);
  const [commissionPer, setCommissionPer] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

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

  async function load() {
    if (!employerId) {
      setError('Employer not signed in');
      return;
    }

    setLoading(true);
    setError('');
    setCandidates([]);
    setTotals(null);

    try {
      const body = { employerId };
      if (fromDate) body.fromDate = fromDate;
      if (toDate) body.toDate = toDate;
      if (month && year) {
        body.month = month;
        body.year = year;
      }

      const res = await fetch('/api/employer/commissions/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Failed');
      setCommissionPer(j.commissionPer || 0);
      setCandidates(j.candidates || []);
      setTotals(j.totals || null);
    } catch (err) {
      setError(String(err.message || err));
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-bold">Commission Details</h1>
      <p className="mt-2 text-sm text-gray-600">Per-student commission records for your referral program.</p>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4 items-end">
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
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm">Year</label>
          <input type="number" className="mt-1 rounded border px-3 py-2 w-full" value={year} onChange={(e) => setYear(e.target.value)} placeholder="2024" />
        </div>
      </div>

      <div className="mt-4">
        <button className="rounded bg-[#0D1630] px-4 py-2 text-white" onClick={load}>Load Commissions</button>
      </div>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {totals && (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-3xl border bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-600">Commission per student</div>
            <div className="font-black text-xl">₹{commissionPer}</div>
          </div>
          <div className="rounded-3xl border bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-600">Total Credited</div>
            <div className="font-black text-xl">₹{totals.totalCredited}</div>
          </div>
          <div className="rounded-3xl border bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-600">Total Pending</div>
            <div className="font-black text-xl">₹{totals.totalPending}</div>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {candidates.length === 0 && !loading && <p className="text-sm text-gray-600">No referred candidates found for the selected range.</p>}

        {candidates.map((c) => (
          <div key={c._id} className="rounded-3xl border bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-lg font-semibold text-[#0D1630]">{c.fullName}</div>
                <div className="mt-1 text-sm text-gray-600">{c.commissionCredited ? 'Commission credited' : 'Commission pending'}</div>
              </div>
              <button onClick={() => setSelectedCandidate(c)} className="rounded-full bg-[#6F925C] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5c7f4f]">
                View details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCandidate && (
        <CandidateDetailModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
      )}
    </div>
  );
}
