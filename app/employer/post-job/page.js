"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmployerPostJob() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [workMode, setWorkMode] = useState("Onsite");
  const [employmentType, setEmploymentType] = useState("Full Time");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const e = typeof window !== 'undefined' && localStorage.getItem('employer');
    if (!e) router.replace('/employer/login');
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    let employer = null;
    try {
      employer = JSON.parse(localStorage.getItem('employer') || 'null');
    } catch (err) {
      employer = null;
    }

    if (!employer?.id) {
      setMessage('Please sign in again before posting a job.');
      router.replace('/employer/login');
      return;
    }

    const payload = { employerId: employer.id, title, department: '', companyLogo: '', location, city, state: stateVal, workMode, employmentType, industry: '', experienceMin: 0, experienceMax: 0, salaryMin: 0, salaryMax: 0, vacancies: 1, skillsRequired: skills.split(',').map(s=>s.trim()).filter(Boolean), qualificationRequired: '', description, responsibilities: [], requirements: [], benefits: [] };

    try {
      const res = await fetch('/api/jobs/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) { setMessage('Failed to post job: ' + (data.error || res.statusText)); return; }
      setMessage('Job submitted successfully. It will appear after admin approval.');
      setTimeout(()=> router.push('/employer/dashboard'), 1000);
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
          <label className="block text-sm text-gray-600">Skills (comma separated)</label>
          <input value={skills} onChange={e=>setSkills(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Description</label>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} required className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 h-32" />
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-full bg-[#0D1630] px-6 py-2 text-white">Post job</button>
          <button type="button" onClick={() => router.push('/employer/dashboard')} className="text-sm text-[#6F925C]">Cancel</button>
        </div>
        {message && <div className="text-sm text-green-600">{message}</div>}
      </form>
    </div>
  );
}
