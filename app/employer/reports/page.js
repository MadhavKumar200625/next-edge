"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function EmployerReportsPage(){
  const searchParams = useSearchParams();
  const [employerId, setEmployerId] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(()=>{
    try{
      const queryId = searchParams?.get?.('employerId');
      if (queryId) {
        setEmployerId(queryId);
        return;
      }
    } catch (err) {}

    try{
      const e = typeof window !== 'undefined' && localStorage.getItem('employer');
      if(e){ const emp = JSON.parse(e); if(emp && emp.id) setEmployerId(emp.id); }
    }catch(err){}
  }, [searchParams]);

  async function fetchData(){
    if(!employerId) { setError('Employer not signed in'); return; }
    setLoading(true); setError('');
    try{
      const body = { employerId };
      if(fromDate) body.fromDate = fromDate;
      if(toDate) body.toDate = toDate;
      if(month && year){ body.month = month; body.year = year; }

      const res = await fetch('/api/reports/employer/summary', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const d = await res.json();
      if(!res.ok) throw new Error(d.error || 'Failed');
      setData(d);
    }catch(err){ setError(String(err.message || err)); }
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-bold">Employer Reports</h1>
      <p className="mt-2 text-sm text-gray-600">Reports for your company — view by date range or month.</p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
        <div>
          <label className="text-sm">From</label>
          <input type="date" className="mt-1 rounded border px-3 py-2 w-full" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} />
        </div>
        <div>
          <label className="text-sm">To</label>
          <input type="date" className="mt-1 rounded border px-3 py-2 w-full" value={toDate} onChange={(e)=>setToDate(e.target.value)} />
        </div>
        <div>
          <label className="text-sm">Month</label>
          <select className="mt-1 rounded border px-3 py-2 w-full" value={month} onChange={(e)=>setMonth(e.target.value)}>
            <option value="">—</option>
            {Array.from({length:12}).map((_,i)=>(<option key={i} value={i+1}>{i+1}</option>))}
          </select>
        </div>
        <div>
          <label className="text-sm">Year</label>
          <input type="number" className="mt-1 rounded border px-3 py-2 w-full" value={year} onChange={(e)=>setYear(e.target.value)} placeholder="2024" />
        </div>
      </div>

      <div className="mt-4">
        <button className="rounded bg-[#0D1630] px-4 py-2 text-white" onClick={fetchData}>Load Reports</button>
      </div>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {data && data.ok && (
        <div className="mt-6">
          <div className="rounded border bg-white p-4">
            <h2 className="text-lg font-bold">Employer</h2>
            <p className="mt-1">{data.employer?.fullName} — {data.employer?.email}</p>
            <div className="mt-2 grid grid-cols-3 gap-4">
              <div className="p-3 border rounded">Jobs: <div className="font-black">{data.employer?.totalJobsPosted}</div></div>
              <div className="p-3 border rounded">Pending Commission: <div className="font-black">₹{data.employer?.pendingCommission}</div></div>
              <div className="p-3 border rounded">Total Earned: <div className="font-black">₹{data.employer?.totalCommissionEarned}</div></div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold">Jobs</h3>
            {data.jobs.length===0 && <p className="mt-2 text-sm text-gray-600">No jobs found.</p>}
            {data.jobs.map(job=> (
              <div key={job.jobId} className="mt-3 rounded border bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">{job.title}</div>
                    <div className="text-sm text-gray-600">{job.jobCode} — {job.totalApplications} applicants</div>
                  </div>
                </div>

                <div className="mt-3">
                  <h4 className="font-bold">Recent Applicants</h4>
                  {job.applicants.length===0 && <p className="text-sm text-gray-600">No applicants yet.</p>}
                  {job.applicants.map(a=> (
                    <div key={a.applicationId} className="mt-2 border-t pt-2">
                      <div className="text-sm font-semibold">{a.candidate?.fullName || '—'}</div>
                      <div className="text-xs text-gray-600">{a.candidate?.email || ''} • {a.status} • {new Date(a.appliedAt).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold">Referred Candidates (commission records)</h3>
            {data.referredCandidates.length===0 && <p className="text-sm text-gray-600">No referred candidates found.</p>}
            {data.referredCandidates.map(c=> (
              <div key={c._id} className="mt-2 border-t pt-2">
                <div className="text-sm font-semibold">{c.fullName}</div>
                <div className="text-xs text-gray-600">{c.email} • credited: {String(c.commissionCredited)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
