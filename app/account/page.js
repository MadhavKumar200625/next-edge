"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString();
}

export default function AccountPage() {
  const router = useRouter();
  const [candidate, setCandidate] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadAccount() {
      const saved = localStorage.getItem("user");
      if (!saved) {
        router.replace("/login");
        return;
      }

      try {
        const user = JSON.parse(saved);
        const res = await fetch("/api/account/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: user.token }),
        });
        const data = await res.json();

        if (!res.ok) {
          setMessage(data.error || "Could not load your account.");
          return;
        }

        setCandidate(data.candidate);
        setApplications(data.applications || []);
      } catch (err) {
        setMessage(String(err.message || err));
      } finally {
        setLoading(false);
      }
    }

    loadAccount();
  }, [router]);

  function logout() {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("nextedge-auth-change"));
    router.push("/login");
  }

  if (loading) {
    return <div className="mx-auto max-w-6xl px-6 py-12 text-gray-600">Loading account...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#0D1630]">My Account</h1>
          <p className="mt-2 text-gray-600">View your profile and applied jobs.</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-full border border-gray-200 px-5 py-2 font-semibold text-gray-700"
        >
          Logout
        </button>
      </div>

      {message && (
        <div className="mb-6 border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {message}
        </div>
      )}

      {candidate && (
        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="border border-gray-100 bg-white p-5 md:col-span-2">
            <p className="text-sm text-gray-500">Candidate</p>
            <p className="mt-1 text-xl font-black text-[#0D1630]">
              {candidate.fullName}
            </p>
            <p className="mt-1 text-sm text-gray-600">{candidate.email}</p>
            <p className="mt-1 text-sm text-gray-600">{candidate.phone}</p>
          </div>
          <div className="border border-gray-100 bg-white p-5">
            <p className="text-sm text-gray-500">Plan</p>
            <p className="mt-1 text-xl font-black text-[#0D1630]">
              {candidate.hasActivePlan ? "Active" : "Inactive"}
            </p>
          </div>
          <div className="border border-gray-100 bg-white p-5">
            <p className="text-sm text-gray-500">Plan Expiry</p>
            <p className="mt-1 text-xl font-black text-[#0D1630]">
              {formatDate(candidate.planExpiryDate)}
            </p>
          </div>
        </section>
      )}

      <section className="border border-gray-100 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-xl font-bold text-[#0D1630]">Applied Jobs</h2>
        </div>

        {applications.length === 0 ? (
          <div className="px-5 py-8 text-center text-gray-500">
            You have not applied to any jobs yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {applications.map((application) => {
              const job = application.jobId;

              return (
                <div key={application._id} className="flex flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-bold text-[#0D1630]">
                      {job?.positionName || job?.title || "Job unavailable"}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {[job?.location, job?.city, job?.state].filter(Boolean).join(", ")}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      Applied on {formatDate(application.appliedAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-[#F1F7F0] px-3 py-1 text-xs font-bold text-[#2d4a2b]">
                      {application.status}
                    </span>
                    {job?._id && (
                      <Link
                        href={`/jobs/${job._id}`}
                        className="text-sm font-semibold text-[#6F925C]"
                      >
                        View job
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
