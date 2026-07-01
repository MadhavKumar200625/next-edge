"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CandidateDetailModal from '../../../components/CandidateDetailModal';

export default function ManageJobsPage(){
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' && localStorage.getItem('employer');
    if (!stored) {
      router.replace('/employer/login');
      return;
    }

    try {
      const employer = JSON.parse(stored);
      if (!employer?.id) {
        router.replace('/employer/login');
        return;
      }
      loadJobs(employer.id);
    } catch (err) {
      router.replace('/employer/login');
    }
  }, [router]);

  async function loadJobs(employerId) {
    if (!employerId) {
      setError('Unable to detect employer login. Please sign in again.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/employer/jobs/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employerId }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || 'Failed to load jobs');
      setJobs(d.jobs || []);
    } catch (err) {
      setError(String(err.message || err));
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-bold">Manage Jobs</h1>
      <p className="mt-2 text-sm text-gray-600">View jobs you've posted and see applicants.</p>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      <div className="mt-6 space-y-6">
        {jobs.map(job => (
          <div key={job.jobId} className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-lg font-semibold text-[#0D1630]">{job.title}</div>
                <div className="text-sm text-gray-600">{job.jobCode} • {job.totalApplications} applicants • {job.status}</div>
              </div>
              <button onClick={() => loadJobs(job.employerId)} className="rounded border px-4 py-2 text-[#0D1630]">Refresh</button>
            </div>

            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Applicants</h4>
              {job.recentApplicants.length === 0 ? (
                <p className="text-sm text-gray-600">No recent applicants.</p>
              ) : (
                <div className="space-y-3">
                  {job.recentApplicants.map(a => (
                    <div key={a.id} className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-sm font-semibold text-[#0D1630]">{a.candidate?.fullName || 'Anonymous'}</div>
                        <div className="text-xs text-gray-500">Applied on {new Date(a.appliedAt).toLocaleDateString()}</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => setSelectedApplicant(a)} className="rounded-full bg-[#6F925C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5c7f4f]">
                          View full details
                        </button>
                        {a.candidate?.resumeFile ? (
                          <a href={a.candidate.resumeFile} target="_blank" rel="noreferrer" className="rounded-full border border-[#6F925C] px-4 py-2 text-sm font-semibold text-[#0D1630] hover:bg-gray-100">
                            View CV
                          </a>
                        ) : (
                          <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-500">CV unavailable</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedApplicant && (
        <CandidateDetailModal candidate={selectedApplicant.candidate} onClose={() => setSelectedApplicant(null)} />
      )}
    </div>
  );
}
