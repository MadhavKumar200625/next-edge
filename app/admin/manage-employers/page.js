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
  if (!value) return "-";
  return new Date(value).toLocaleDateString();
}

export default function ManageEmployersPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const isSuperAdmin = admin?.role === "super_admin";

  async function loadEmployers() {
    const activeAdmin = getAdmin();
    if (!activeAdmin?.token) {
      router.replace("/admin/login");
      return;
    }

    setAdmin(activeAdmin);
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/employers", {
        headers: { Authorization: `Bearer ${activeAdmin.token}` },
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to load employers");
        return;
      }

      setEmployers(data.employers || []);
    } catch (err) {
      setMessage(String(err.message || err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function loadInitialEmployers() {
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
        const res = await fetch("/api/admin/employers", {
          headers: { Authorization: `Bearer ${activeAdmin.token}` },
        });
        const data = await res.json();

        if (!res.ok) {
          setMessage(data.error || "Failed to load employers");
          return;
        }

        setEmployers(data.employers || []);
      } catch (err) {
        setMessage(String(err.message || err));
      } finally {
        setLoading(false);
      }
    }

    loadInitialEmployers();

    return () => {
      ignore = true;
    };
  }, [router]);

  async function updateEmployer(employer, payload, successMessage) {
    if (!admin?.token) return;

    setMessage("");
    try {
      const res = await fetch(`/api/admin/employers/${employer._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${admin.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to update employer");
        return;
      }

      setMessage(successMessage);
      await loadEmployers();
    } catch (err) {
      setMessage(String(err.message || err));
    }
  }

  async function deleteEmployer(employer) {
    if (!admin?.token || !isSuperAdmin) return;
    if (!window.confirm(`Delete employer "${employer.fullName}" and all their jobs?`)) return;

    setMessage("");
    try {
      const res = await fetch(`/api/admin/employers/${employer._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to delete employer");
        return;
      }

      setMessage("Employer deleted.");
      await loadEmployers();
    } catch (err) {
      setMessage(String(err.message || err));
    }
  }

  const counts = useMemo(() => {
    return employers.reduce(
      (acc, employer) => {
        acc.total += 1;
        if (employer.isActive) acc.active += 1;
        if (employer.approvalStatus === "pending") acc.pending += 1;
        return acc;
      },
      { total: 0, active: 0, pending: 0 }
    );
  }, [employers]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0D1630]">Manage Employers</h1>
        <p className="mt-1 text-gray-600">
          Review employer accounts, approval status, posting access, and activity.
        </p>
      </div>

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <div className="border border-gray-100 bg-white p-5">
          <p className="text-sm text-gray-500">Employers</p>
          <p className="mt-1 text-2xl font-black text-[#0D1630]">{counts.total}</p>
        </div>
        <div className="border border-gray-100 bg-white p-5">
          <p className="text-sm text-gray-500">Active accounts</p>
          <p className="mt-1 text-2xl font-black text-[#0D1630]">{counts.active}</p>
        </div>
        <div className="border border-gray-100 bg-white p-5">
          <p className="text-sm text-gray-500">Pending approval</p>
          <p className="mt-1 text-2xl font-black text-[#0D1630]">{counts.pending}</p>
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
              <th className="px-5 py-4">Employer</th>
              <th className="px-5 py-4">Referral</th>
              <th className="px-5 py-4">Approval</th>
              <th className="px-5 py-4">Jobs</th>
              <th className="px-5 py-4">Joined</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-gray-500">
                  Loading employers...
                </td>
              </tr>
            )}

            {!loading && employers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-gray-500">
                  No employers found.
                </td>
              </tr>
            )}

            {!loading &&
              employers.map((employer) => (
                <tr key={employer._id} className="align-top">
                  <td className="px-5 py-4">
                    <p className="font-bold text-[#0D1630]">{employer.fullName}</p>
                    <p className="mt-1 text-xs text-gray-500">{employer.email}</p>
                    <p className="mt-1 text-xs text-gray-500">{employer.phone}</p>
                    <span
                      className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        employer.isActive
                          ? "bg-[#F1F7F0] text-[#2d4a2b]"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {employer.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-gray-700">
                    {employer.referralCode}
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={employer.approvalStatus}
                      onChange={(event) =>
                        updateEmployer(
                          employer,
                          { approvalStatus: event.target.value },
                          "Employer approval updated."
                        )
                      }
                      className="rounded-md border border-gray-200 px-3 py-2 capitalize"
                    >
                      <option value="pending">pending</option>
                      <option value="approved">approved</option>
                      <option value="rejected">rejected</option>
                    </select>
                  </td>
                  <td className="px-5 py-4 text-gray-700">
                    <p>Total: {employer.totalJobsPosted || 0}</p>
                    <p>Active: {employer.activeJobsCount || 0}</p>
                    <label className="mt-3 flex items-center gap-2 text-xs font-semibold text-gray-600">
                      <input
                        type="checkbox"
                        checked={Boolean(employer.unlimitedJobPosting)}
                        onChange={(event) =>
                          updateEmployer(
                            employer,
                            { unlimitedJobPosting: event.target.checked },
                            "Employer posting access updated."
                          )
                        }
                      />
                      Unlimited posting
                    </label>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-gray-500">Limit</span>
                      <input
                        type="number"
                        min={0}
                        defaultValue={employer.jobPostingLimit || 0}
                        onBlur={(event) =>
                          updateEmployer(
                            employer,
                            { jobPostingLimit: event.target.value },
                            "Employer posting limit updated."
                          )
                        }
                        className="w-20 rounded-md border border-gray-200 px-2 py-1"
                      />
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-700">
                    {formatDate(employer.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateEmployer(
                            employer,
                            { isActive: !employer.isActive },
                            employer.isActive
                              ? "Employer deactivated."
                              : "Employer activated."
                          )
                        }
                        className="rounded-full border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700"
                      >
                        {employer.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        type="button"
                        disabled={!isSuperAdmin}
                        onClick={() => deleteEmployer(employer)}
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
