"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EmployerDashboard() {
  const router = useRouter();
  const [referralCode, setReferralCode] = useState('');

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
      }
    } catch (err) {}
  }, [router]);

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0D1630]">Employer Dashboard</h1>
          <p className="text-gray-600 mt-1">Quick actions for your company</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/employer/post-job" className="block p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-[#0D1630]">Post a Job</h3>
          <p className="text-sm text-gray-600 mt-2">Create a new job posting for your company.</p>
        </Link>

        <Link href="#" className="block p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition">
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
