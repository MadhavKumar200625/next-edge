"use client";

import { useState } from "react";

export default function CandidateForgot() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function submit(e) {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch("/api/auth/candidate/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      await res.json();
      setStatus('If the email exists you will receive an OTP. Check spam if not received.');
    } catch (err) {
      setStatus(String(err.message || err));
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold">Forgot Password — Candidate</h1>
      <p className="mt-2 text-sm text-gray-600">Enter your registered email to receive an OTP.</p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-gray-700">Email</span>
          <input type="email" className="mt-2 w-full rounded-md border px-3 py-2" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button className="rounded bg-[#0D1630] px-4 py-2 text-white" type="submit">Send OTP</button>
          <div className="space-y-1 text-sm text-[#6F925C]">
            <a href="/forgot/verify" className="hover:underline">Have OTP? Verify</a>
            <a href="/employer/forgot" className="hover:underline">Are you an employer? Reset here</a>
          </div>
        </div>
      </form>

      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
    </div>
  );
}
