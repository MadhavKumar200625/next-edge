"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

function getAdmin() {
  try {
    return JSON.parse(localStorage.getItem("admin") || "null");
  } catch (err) {
    return null;
  }
}

function formatDate(value) {
  if (!value) return "Not published";
  return new Date(value).toLocaleDateString();
}

export default function AdminJobTable({ initialStatus = "all", title, subtitle }) {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const isSuperAdmin = admin?.role === "super_admin";

  async function loadJobs(nextStatus = status) {
    const activeAdmin = getAdmin();
    if (!activeAdmin?.token) {
      router.replace("/admin/login");
      return;
    }

    setAdmin(activeAdmin);
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`/api/admin/jobs?status=${nextStatus}`, {
        headers: { Authorization: `Bearer ${activeAdmin.token}` },
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to load jobs");
        return;
      }

      setJobs(data.jobs || []);
    } catch (err) {
      setMessage(String(err.message || err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function loadInitialJobs() {
      const activeAdmin = getAdmin();
      if (!activeAdmin?.token) {
        router.replace("/admin/login");
        return;
      }

      await Promise.resolve();
      if (ignore) return;

      setAdmin(activeAdmin);
      setLoading(true);
      setMessage("");

      try {
        const res = await fetch(`/api/admin/jobs?status=${initialStatus}`, {
          headers: { Authorization: `Bearer ${activeAdmin.token}` },
        });
        const data = await res.json();

        if (!res.ok) {
          setMessage(data.error || "Failed to load jobs");
          return;
        }

        setJobs(data.jobs || []);
      } catch (err) {
        setMessage(String(err.message || err));
      } finally {
        setLoading(false);
      }
    }

    loadInitialJobs();

    return () => {
      ignore = true;
    };
  }, [initialStatus, router]);

  async function updateJob(job, isActive) {
    if (!admin?.token) return;

    setMessage("");
    try {
      const res = await fetch(`/api/admin/jobs/${job._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${admin.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive,
          status: isActive ? "active" : "draft",
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to update job");
        return;
      }

      setMessage(isActive ? "Job activated." : "Job moved to inactive.");
      await loadJobs(status);
    } catch (err) {
      setMessage(String(err.message || err));
    }
  }

  async function deleteJob(job) {
    if (!admin?.token || !isSuperAdmin) return;
    if (!window.confirm(`Delete "${job.title}" permanently?`)) return;

    setMessage("");
    try {
      const res = await fetch(`/api/admin/jobs/${job._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to delete job");
        return;
      }

      setMessage("Job deleted.");
      await loadJobs(status);
    } catch (err) {
      setMessage(String(err.message || err));
    }
  }

  const counts = useMemo(() => {
    return jobs.reduce(
      (acc, job) => {
        if (job.isActive && job.status === "active") acc.active += 1;
        else acc.inactive += 1;
        return acc;
      },
      { active: 0, inactive: 0 }
    );
  }, [jobs]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0D1630]">{title}</h1>
          <p className="mt-1 text-gray-600">{subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {["all", "inactive", "active"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setStatus(item);
                loadJobs(item);
              }}
              className={`rounded-full border px-4 py-2 text-sm font-semibold capitalize ${
                status === item
                  ? "border-[#0D1630] bg-[#0D1630] text-white"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <div className="border border-gray-100 bg-white p-5">
          <p className="text-sm text-gray-500">Loaded jobs</p>
          <p className="mt-1 text-2xl font-black text-[#0D1630]">{jobs.length}</p>
        </div>
        <div className="border border-gray-100 bg-white p-5">
          <p className="text-sm text-gray-500">Active in this view</p>
          <p className="mt-1 text-2xl font-black text-[#0D1630]">{counts.active}</p>
        </div>
        <div className="border border-gray-100 bg-white p-5">
          <p className="text-sm text-gray-500">Inactive in this view</p>
          <p className="mt-1 text-2xl font-black text-[#0D1630]">{counts.inactive}</p>
        </div>
      </div>

      {message && (
        <div className="mb-5 border border-[#6F925C]/20 bg-[#F1F7F0] px-4 py-3 text-sm text-[#2d4a2b]">
          {message}
        </div>
      )}

      <div className="overflow-x-auto border border-gray-100 bg-white">
        <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
          <thead className="bg-[#F8FAF7] text-xs uppercase tracking-[0.16em] text-gray-500">
            <tr>
              <th className="px-5 py-4">Job</th>
              <th className="px-5 py-4">Company</th>
              <th className="px-5 py-4">Location</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Published</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-gray-500">
                  Loading jobs...
                </td>
              </tr>
            )}

            {!loading && jobs.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-gray-500">
                  No jobs found.
                </td>
              </tr>
            )}

            {!loading &&
              jobs.map((job) => (
                <tr key={job._id} className="align-top">
                  <td className="px-5 py-4">
                    <p className="font-bold text-[#0D1630]">{job.title}</p>
                    <p className="mt-1 text-xs text-gray-500">{job.jobCode}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-700">
                    {job.companyName || "Confidential Employer"}
                  </td>
                  <td className="px-5 py-4 text-gray-700">
                    {job.location || [job.city, job.state].filter(Boolean).join(", ") || "-"}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        job.isActive && job.status === "active"
                          ? "bg-[#F1F7F0] text-[#2d4a2b]"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {job.isActive && job.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-700">
                    {formatDate(job.publishedAt)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      {job.isActive ? (
                        <button
                          type="button"
                          onClick={() => updateJob(job, false)}
                          className="rounded-full border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700"
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => updateJob(job, true)}
                          className="rounded-full bg-[#6F925C] px-3 py-2 text-xs font-bold text-white"
                        >
                          Activate
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={!isSuperAdmin}
                        onClick={() => deleteJob(job)}
                        className="rounded-full bg-red-600 px-3 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
