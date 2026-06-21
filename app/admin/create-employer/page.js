"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEmployerPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch('/api/admin/create-employer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fullName, email, phone, password }) });
      const data = await res.json();
      if (!res.ok) { setMessage(data.error || 'Failed'); setLoading(false); return; }
      setMessage('Employer created: ' + (data.employer?.referralCode || '')); 
      setTimeout(()=> router.push('/admin/dashboard'), 1400);
    } catch (err) { setMessage(String(err.message || err)); }
    setLoading(false);
  }

  return (
    <div className="px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0D1630] mb-4">Create Employer</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-gray-100">
        <div>
          <label className="block text-sm text-gray-600">Full Name</label>
          <input value={fullName} onChange={e=>setFullName(e.target.value)} required className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Phone</label>
          <input value={phone} onChange={e=>setPhone(e.target.value)} required className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
        </div>

        <div className="flex items-center gap-3">
          <button disabled={loading} className="rounded-full bg-[#0D1630] px-6 py-2 text-white">{loading? 'Creating...':'Create'}</button>
        </div>

        {message && <div className="text-sm text-gray-700">{message}</div>}
      </form>
    </div>
  );
}
