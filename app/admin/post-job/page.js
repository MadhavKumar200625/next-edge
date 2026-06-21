"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPostJob() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [workMode, setWorkMode] = useState("Onsite");
  const [employmentType, setEmploymentType] = useState("Full Time");
  const [minExp, setMinExp] = useState(0);
  const [maxExp, setMaxExp] = useState(5);
  const [salaryMin, setSalaryMin] = useState(0);
  const [salaryMax, setSalaryMax] = useState(0);
  const [vacancies, setVacancies] = useState(1);
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const a = typeof window !== 'undefined' && localStorage.getItem('admin');
    if (!a) router.replace('/admin/login');
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { title, department: '', companyLogo: '', location, city, state: stateVal, workMode, employmentType, industry: '', experienceMin: minExp, experienceMax: maxExp, salaryMin, salaryMax, vacancies, skillsRequired: skills.split(',').map(s=>s.trim()).filter(Boolean), qualificationRequired: '', description, responsibilities: [], requirements: [], benefits: [] };

    try {
      const res = await fetch('/api/jobs/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) {
        setMessage('Failed to post job: ' + (data.error || res.statusText));
        return;
      }
      setMessage('Job posted successfully.');
      setTimeout(()=> router.push('/admin/dashboard'), 1000);
    } catch (err) {
      setMessage(String(err.message || err));
    }
  }

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0D1630] mb-4">Post a Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-gray-100">
        <div>
          <label className="block text-sm text-gray-600">Job title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} required className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-gray-600">Location</label>
            <input value={location} onChange={e=>setLocation(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600">City</label>
            <input value={city} onChange={e=>setCity(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600">State</label>
            <input value={stateVal} onChange={e=>setStateVal(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-gray-600">Work Mode</label>
            <select value={workMode} onChange={e=>setWorkMode(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2">
              <option>Remote</option>
              <option>Hybrid</option>
              <option>Onsite</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Employment Type</label>
            <select value={employmentType} onChange={e=>setEmploymentType(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2">
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Vacancies</label>
            <input type="number" value={vacancies} onChange={e=>setVacancies(Number(e.target.value))} min={1} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-600">Experience Min (yrs)</label>
            <input type="number" value={minExp} onChange={e=>setMinExp(Number(e.target.value))} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Experience Max (yrs)</label>
            <input type="number" value={maxExp} onChange={e=>setMaxExp(Number(e.target.value))} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-600">Salary Min (annual INR)</label>
            <input type="number" value={salaryMin} onChange={e=>setSalaryMin(Number(e.target.value))} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Salary Max (annual INR)</label>
            <input type="number" value={salaryMax} onChange={e=>setSalaryMax(Number(e.target.value))} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600">Skills (comma separated)</label>
          <input value={skills} onChange={e=>setSkills(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Description</label>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} required className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 h-32" />
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-full bg-[#0D1630] px-6 py-2 text-white">Post job</button>
          <button type="button" onClick={() => router.push('/admin/dashboard')} className="text-sm text-[#6F925C]">Cancel</button>
        </div>

        {message && <div className="text-sm text-green-600">{message}</div>}
      </form>
    </div>
  );
}
