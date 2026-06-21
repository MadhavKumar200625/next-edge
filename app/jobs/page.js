"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

function makeGibberish(len = 12) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

function JobCard({ job }) {
  const gib = useMemo(() => makeGibberish(10), []);

  return (
    <div className="border border-gray-100 rounded-2xl p-4 hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <img src={job.companyLogo || '/company-placeholder.png'} alt="logo" className="h-12 w-12 rounded-md object-cover" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#0D1630]">{job.title}</h3>
              <div className="text-sm text-gray-500">{job.department}</div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-600">{job.location || `${job.city || ''}${job.city && job.state ? ', ' : ''}${job.state || ''}`}</div>
              <div className="mt-1 inline-flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-1 rounded-full bg-gray-100">{job.workMode}</span>
                <span className="px-2 py-1 rounded-full bg-gray-100">{job.employmentType}</span>
              </div>
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-700 line-clamp-2">{job.description}</p>

          <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <strong className="text-gray-800">Exp:</strong>
                <span>{job.experienceMin || 0} - {job.experienceMax || 0} yrs</span>
              </div>

              <div className="flex items-center gap-2">
                <strong className="text-gray-800">Salary:</strong>
                <span>₹{job.salaryMin ? (job.salaryMin/1000).toLocaleString() + 'k' : '—'} - {job.salaryMax ? (job.salaryMax/1000).toLocaleString() + 'k' : '—'}</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Vacancies: {job.vacancies || 1}</div>
            </div>
          </div>

          <div className="mt-3 flex items-center flex-wrap gap-2">
            {(job.skillsRequired || []).map((s) => (
              <span key={s} className="text-xs bg-[#F1F7F0] text-[#2d4a2b] px-2 py-1 rounded">{s}</span>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm text-gray-500">Posted: {job.publishedAt ? new Date(job.publishedAt).toLocaleDateString() : ''}</div>

            {/* Company name intentionally not loaded from DB: show blurred gibberish */}
            <div className="text-sm text-gray-500">
              <span className="px-3 py-1 rounded bg-gray-50 text-gray-400 select-none blur-sm" style={{ WebkitUserSelect: 'none' }}>{gib}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // auth check: candidate must be logged in
  useEffect(() => {
    const u = typeof window !== 'undefined' && localStorage.getItem('user');
    if (!u) {
      router.replace('/login');
      return;
    }

    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/jobs/list');
        const data = await res.json();
        if (res.ok && data.jobs) setJobs(data.jobs);
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router]);

  // filters state
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [minExp, setMinExp] = useState(0);
  const [maxExp, setMaxExp] = useState(20);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [sort, setSort] = useState('newest');

  const allSkills = useMemo(() => {
    const s = new Set();
    jobs.forEach(j => (j.skillsRequired || []).forEach(k => s.add(k)));
    return Array.from(s);
  }, [jobs]);

  function toggleSkill(skill) {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(x => x !== skill) : [...prev, skill]);
  }

  const filtered = useMemo(() => {
    let list = jobs.slice();

    if (query) list = list.filter(j => (j.title || '').toLowerCase().includes(query.toLowerCase()));
    if (location) list = list.filter(j => ((j.city || '') + ", " + (j.state || '')).toLowerCase().includes(location.toLowerCase()));
    if (workMode) list = list.filter(j => j.workMode === workMode);
    if (employmentType) list = list.filter(j => j.employmentType === employmentType);
    list = list.filter(j => (j.experienceMin || 0) <= maxExp && (j.experienceMax || 0) >= minExp);
    if (selectedSkills.length) list = list.filter(j => selectedSkills.every(sk => (j.skillsRequired || []).includes(sk)));

    if (sort === 'newest') list.sort((a,b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    if (sort === 'salary-desc') list.sort((a,b) => (b.salaryMax||0) - (a.salaryMax||0));
    if (sort === 'salary-asc') list.sort((a,b) => (a.salaryMin||0) - (b.salaryMin||0));

    return list;
  }, [jobs, query, location, workMode, employmentType, minExp, maxExp, selectedSkills, sort]);

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0D1630]">Find Jobs</h1>
          <p className="text-gray-600 mt-1">Browse curated jobs — company names are hidden for privacy.</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            placeholder="Search job title, keywords..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="rounded-full border border-gray-200 px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-[#6F925C]"
          />

          <select value={sort} onChange={e => setSort(e.target.value)} className="rounded-lg border border-gray-200 px-3 py-2">
            <option value="newest">Newest</option>
            <option value="salary-desc">Salary: High to Low</option>
            <option value="salary-asc">Salary: Low to High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="font-semibold mb-3 text-gray-700">Filters</h4>

          <div className="mb-3">
            <label className="block text-sm text-gray-600">Location</label>
            <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="City or State" className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
          </div>

          <div className="mb-3">
            <label className="block text-sm text-gray-600">Work mode</label>
            <div className="mt-2 flex gap-2 flex-wrap">
              {['Remote','Hybrid','Onsite'].map(w=> (
                <button key={w} type="button" onClick={() => setWorkMode(prev => prev === w ? '' : w)} className={`px-3 py-1 rounded-full border ${workMode===w? 'bg-[#6F925C] text-white':'bg-white'}`}>
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm text-gray-600">Employment type</label>
            <select value={employmentType} onChange={e=>setEmploymentType(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2">
              <option value="">Any</option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Contract</option>
              <option>Internship</option>
              <option>Freelance</option>
            </select>
          </div>

          {/* image10 placeholder */}
          <div className="image-slot small" data-name="image10">image10</div>

          <div className="mb-3">
            <label className="block text-sm text-gray-600">Experience (yrs)</label>
            <div className="flex gap-2 mt-2">
              <input type="number" min={0} value={minExp} onChange={e=>setMinExp(Number(e.target.value))} className="w-1/2 rounded-md border border-gray-200 px-2 py-1" />
              <input type="number" min={0} value={maxExp} onChange={e=>setMaxExp(Number(e.target.value))} className="w-1/2 rounded-md border border-gray-200 px-2 py-1" />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm text-gray-600">Skills</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {allSkills.map(s => (
                <button key={s} type="button" onClick={() => toggleSkill(s)} className={`px-2 py-1 rounded-full text-xs ${selectedSkills.includes(s)? 'bg-[#6F925C] text-white':'bg-gray-100 text-gray-700'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <button onClick={() => { setQuery(''); setLocation(''); setWorkMode(''); setEmploymentType(''); setMinExp(0); setMaxExp(20); setSelectedSkills([]); }} className="text-sm text-[#6F925C]">Reset filters</button>
          </div>
        </aside>

        <section className="lg:col-span-3">
          <div className="space-y-4">
            {loading && (
              <div className="p-6 bg-white rounded-2xl border border-gray-100 text-center text-gray-600">Loading jobs...</div>
            )}

            {!loading && filtered.length === 0 && (
              <div className="p-6 bg-white rounded-2xl border border-gray-100 text-center text-gray-600">No jobs found with selected filters.</div>
            )}

            {filtered.map(job => (
              <JobCard key={job.jobCode || job._id} job={job} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
