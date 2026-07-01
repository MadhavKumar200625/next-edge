"use client";

import { useEffect, useState } from 'react';

export default function AdminReportsPage(){
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [clearAmounts, setClearAmounts] = useState({});
  const [busy, setBusy] = useState({});
  const [rowMsg, setRowMsg] = useState({});

  useEffect(()=>{ fetchData(); }, []);

  async function fetchData(){
    setLoading(true);
    setError('');
    try{
      let url = '/api/reports/admin/summary';
      const params = [];
      if(fromDate) params.push(`fromDate=${encodeURIComponent(fromDate)}`);
      if(toDate) params.push(`toDate=${encodeURIComponent(toDate)}`);
      if(month) params.push(`month=${encodeURIComponent(month)}`);
      if(year) params.push(`year=${encodeURIComponent(year)}`);
      if(params.length) url += `?${params.join('&')}`;

      const res = await fetch(url);
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || 'Failed');
      setRows(data.rows || []);
      // reset per-row inputs/messages
      setClearAmounts({});
      setRowMsg({});
    }catch(err){ setError(String(err.message || err)); }
    setLoading(false);
  }

  async function handleClear(empId){
    const amt = Number(clearAmounts[empId] || 0);
    const row = rows.find((item) => item.id === empId);
    const pending = Number(row?.pendingCommission || 0);
    if (!amt || amt <= 0) {
      setRowMsg(prev=>({ ...prev, [empId]: 'Enter valid amount.' }));
      return;
    }
    if (amt > pending) {
      setRowMsg(prev=>({ ...prev, [empId]: `Amount cannot exceed pending commission (₹${pending}).` }));
      return;
    }
    try{
      setBusy(prev=>({ ...prev, [empId]: true }));
      setRowMsg(prev=>({ ...prev, [empId]: '' }));
      const res = await fetch('/api/admin/commissions/clear', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ employerId: empId, amount: amt }) });
      const j = await res.json();
      if(!res.ok) throw new Error(j.error || 'Failed to clear');
      setRowMsg(prev=>({ ...prev, [empId]: `Cleared ₹${j.cleared}` }));
      await fetchData();
    }catch(err){ setRowMsg(prev=>({ ...prev, [empId]: String(err.message || err) })); }
    finally{ setBusy(prev=>({ ...prev, [empId]: false })); }
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-bold">Admin Reports</h1>
      <p className="mt-2 text-sm text-gray-600">Overview of employers, jobs posted, applicants and commission totals.</p>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

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

      <div className="mt-3">
        <button className="rounded bg-[#0D1630] px-4 py-2 text-white" onClick={fetchData}>Search</button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="px-3 py-2">Employer</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Jobs</th>
              <th className="px-3 py-2">Applicants</th>
              <th className="px-3 py-2">Pending Commission</th>
              <th className="px-3 py-2">Total Earned</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r=> (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2">{r.fullName}</td>
                <td className="px-3 py-2">{r.email}</td>
                <td className="px-3 py-2">{r.totalJobsPosted}</td>
                <td className="px-3 py-2">{r.totalApplicants}</td>
                <td className="px-3 py-2">₹{r.pendingCommission}</td>
                <td className="px-3 py-2">₹{r.totalCommissionEarned}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <a className="text-sm text-[#6F925C]" href={`/admin/reports/employer/${r.id}`}>View</a>
                    <input
                      type="number"
                      min="0"
                      placeholder="amount"
                      value={clearAmounts[r.id] || ''}
                      onChange={(e)=>setClearAmounts(prev=>({ ...prev, [r.id]: e.target.value }))}
                      className="ml-2 w-28 rounded border px-2 py-1 text-sm"
                    />
                    <button disabled={busy[r.id]} onClick={()=>handleClear(r.id)} className="rounded bg-[#0D1630] px-3 py-1 text-white text-sm">
                      {busy[r.id] ? '...' : 'Clear'}
                    </button>
                  </div>
                  {rowMsg[r.id] && <div className="mt-1 text-xs text-gray-600">{rowMsg[r.id]}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
