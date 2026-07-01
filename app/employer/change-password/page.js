"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EmployerChangePasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("employer");
    if (!saved) {
      router.replace("/employer/login");
      return;
    }
    try {
      const emp = JSON.parse(saved);
      if (emp?.email) {
        setEmail(emp.email);
      } else {
        router.replace("/employer/login");
      }
    } catch (err) {
      router.replace("/employer/login");
    }
  }, [router]);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setStatus("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus("New password and confirm password must match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/employer/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data.error || "Could not change password.");
        return;
      }
      setStatus("Password updated successfully. Redirecting...");
      setTimeout(() => router.push("/employer/dashboard"), 1500);
    } catch (err) {
      setStatus(String(err.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-12">
      <h1 className="text-2xl font-black text-[#0D1630]">Change Password</h1>
      <p className="mt-2 text-sm text-gray-600">
        Use your current employer password to set a new one.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 bg-white p-6 rounded-3xl shadow-sm ring-1 ring-gray-100">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <input type="email" value={email} readOnly className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-50" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Current Password</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
        </div>
        {status && <p className="text-sm text-red-600">{status}</p>}
        <button type="submit" disabled={loading} className="w-full rounded-full bg-[#0D1630] px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">
          {loading ? "Saving..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
