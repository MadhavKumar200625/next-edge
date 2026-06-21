"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmployerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch('/api/employer/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Login failed'); setLoading(false); return; }
      if (data && data.employer) localStorage.setItem('employer', JSON.stringify(data.employer));
      setLoading(false);
      router.push('/employer/dashboard');
    } catch (err) { setError(String(err.message || err)); setLoading(false); }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 p-6">
        <h2 className="text-2xl font-semibold text-[#0D1630] mb-4">Employer Sign in</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input type="password" className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex items-center justify-between">
            <button disabled={loading} className="rounded-full bg-[#0D1630] px-6 py-2 text-white">{loading? 'Signing in...':'Sign In'}</button>
            <a href="/" className="text-sm text-[#6F925C]">Back home</a>
          </div>
        </form>
      </div>
    </div>
  );
}
