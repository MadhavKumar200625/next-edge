"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function OptionCard({ title, desc, href }) {
  return (
    <Link href={href} className="block p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-[#0D1630]">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{desc}</p>
    </Link>
  );
}

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const a = typeof window !== 'undefined' && localStorage.getItem('admin');
    if (!a) router.replace('/admin/login');
  }, [router]);

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0D1630]">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Quick actions and management tools</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <OptionCard title="Post a Job" desc="Create and publish a new job listing." href="/admin/post-job" />
        <OptionCard title="Inactive Jobs" desc="Review employer submissions and activate approved jobs." href="/admin/inactive-jobs" />
        <OptionCard title="Manage Jobs" desc="View, deactivate, activate, or delete job listings." href="/admin/manage-jobs" />
        <OptionCard title="Create Employer" desc="Quickly create an employer account with referral code." href="/admin/create-employer" />
        <OptionCard title="Manage Employers" desc="Approve, review and manage employer accounts." href="/admin/manage-employers" />
        <OptionCard title="Manage Candidates" desc="Search and manage candidate profiles." href="#" />
        <OptionCard title="Reports" desc="View analytics and job performance reports." href="#" />
        <OptionCard title="Settings" desc="Admin settings and permissions." href="#" />
        <OptionCard title="Support" desc="View support tickets and messages." href="#" />
      </div>
    </div>
  );
}
