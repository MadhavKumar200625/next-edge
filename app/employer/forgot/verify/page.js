"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmployerReset() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setStatus('Verifying...');
    try {
      const res = await fetch('/api/auth/employer/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setStatus('Password reset successful — redirecting to login...');
      setTimeout(()=>router.push('/employer/login'), 1200);
    } catch (err) {
      setStatus(String(err.message || err));
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold">Reset Password — Employer</h1>
      <p className="mt-2 text-sm text-gray-600">Enter the OTP sent to your email and choose a new password.</p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-gray-700">Email</span>
          <input type="email" className="mt-2 w-full rounded-md border px-3 py-2" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-gray-700">OTP</span>
          <input type="text" className="mt-2 w-full rounded-md border px-3 py-2" value={otp} onChange={(e)=>setOtp(e.target.value)} required />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-gray-700">New Password</span>
          <input type="password" className="mt-2 w-full rounded-md border px-3 py-2" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required />
        </label>

        <div className="flex items-center justify-end">
          <button className="rounded bg-[#0D1630] px-4 py-2 text-white" type="submit">Reset Password</button>
        </div>
      </form>

      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
    </div>
  );
}
