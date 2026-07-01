"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EmployerDashboard() {
  const router = useRouter();
  const [referralCode, setReferralCode] = useState('');
  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  function logout() {
    localStorage.removeItem('employer');
    window.dispatchEvent(new Event('nextedge-auth-change'));
    router.push('/employer/login');
  }

  useEffect(() => {
    const e = typeof window !== 'undefined' && localStorage.getItem('employer');
    if (!e) {
      router.replace('/employer/login');
      return;
    }

    // fetch employer profile to show referral code
    try {
      const emp = JSON.parse(e);
      if (emp && emp.id) {
        fetch(`/api/employer/${emp.id}`).then(r=>r.json()).then(d=>{ if (d && d.employer && d.employer.referralCode) setReferralCode(d.employer.referralCode); }).catch(()=>{});

        // fetch quick report summary
        (async ()=>{
          try{
            setLoadingSummary(true);
            const res = await fetch('/api/reports/employer/summary', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ employerId: emp.id }) });
            const j = await res.json();
            if (res.ok) setSummary(j);
          }catch(err){}
          setLoadingSummary(false);
        })();
      }
    } catch (err) {}
  }, [router]);

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0D1630]">Employer Dashboard</h1>
          <p className="text-gray-600 mt-1">Quick actions for your company</p>
        </div>
        <button onClick={logout} className="rounded-full border border-gray-200 px-5 py-2 font-semibold text-gray-700">
          Logout
        </button>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded border">
          <h4 className="text-sm text-gray-600">Jobs Posted</h4>
          <div className="mt-2 text-2xl font-black">{loadingSummary ? '...' : (summary?.employer?.totalJobsPosted ?? '—')}</div>
        </div>

        <div className="p-4 bg-white rounded border">
          <h4 className="text-sm text-gray-600">Total Applicants</h4>
          <div className="mt-2 text-2xl font-black">{loadingSummary ? '...' : summary ? summary.jobs?.reduce((s,j)=>s + (j.totalApplications || 0), 0) : '—'}</div>
        </div>

        <div className="p-4 bg-white rounded border">
          <h4 className="text-sm text-gray-600">Pending Commission</h4>
          <div className="mt-2 text-2xl font-black">{loadingSummary ? '...' : (summary?.employer?.pendingCommission != null ? `₹${summary.employer.pendingCommission}` : '—')}</div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/employer/manage-jobs" className="rounded bg-[#6F925C] px-4 py-2 text-white">Open Manage Jobs</Link>
        <Link href="/employer/reports" className="rounded border px-4 py-2 text-[#0D1630]">View Reports</Link>
        <Link href="/employer/change-password" className="rounded border px-4 py-2 text-[#0D1630]">Change Password</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/employer/post-job" className="block p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-[#0D1630]">Post a Job</h3>
          <p className="text-sm text-gray-600 mt-2">Create a new job posting for your company.</p>
        </Link>

        <Link href="/employer/manage-jobs" className="block p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-[#0D1630]">Manage Jobs</h3>
          <p className="text-sm text-gray-600 mt-2">View, edit or close your existing job listings.</p>
        </Link>
        
        {/* image13 placeholder */}
        <div className="image-slot" data-name="image13">image13</div>

        <div className="p-6 bg-white rounded-2xl border border-gray-100">
          <h3 className="text-lg font-semibold text-[#0D1630]">Your Referral Code</h3>
          <p className="text-sm text-gray-600 mt-2">Share this code to invite candidates and earn rewards.</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-md bg-gray-50 px-4 py-2 text-lg font-mono">{referralCode || '—'}</div>
            <button onClick={() => { navigator.clipboard?.writeText(referralCode || '') }} className="text-sm text-[#6F925C]">Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
