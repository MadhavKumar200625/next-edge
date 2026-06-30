"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const initialForm = {
  companyName: "",
  hrName: "",
  hrNumber: "",
  positionName: "",
  location: "",
  preferredCandidates: "Both",
  noticePeriod: "",
  employmentType: "Full Time",
  vacancies: "",
  salaryRange: "",
  experienceRequired: "",
  qualificationRequired: "",
  skillsRequired: "",
  description: "",
  workMode: "Work From Office",
  workingDays: "",
  shiftTiming: "",
  industry: "",
  cabFacility: "No",
  mealFacility: "No",
  requiredSoftwareTools: "",
  languagesRequired: "",
  interviewProcess: "",
};

function Field({ label, name, value, onChange, required = false, type = "text" }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-gray-700">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2"
      />
    </label>
  );
}

function SelectField({ label, name, value, onChange, options, required = false }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-gray-700">
        {label}
        {required ? " *" : ""}
      </span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({ label, name, value, onChange, required = false }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-gray-700">
        {label}
        {required ? " *" : ""}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 h-28 w-full rounded-md border border-gray-200 px-3 py-2"
      />
    </label>
  );
}

export default function JobCreationForm({ mode }) {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [employerId, setEmployerId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadInitialContext() {
      const storageKey = mode === "admin" ? "admin" : "employer";
      const redirectTo = mode === "admin" ? "/admin/login" : "/employer/login";
      const saved = typeof window !== "undefined" && localStorage.getItem(storageKey);

      if (!saved) {
        router.replace(redirectTo);
        return;
      }

      if (mode !== "employer") return;

      try {
        const employer = JSON.parse(saved);
        await Promise.resolve();
        if (ignore) return;

        setEmployerId(employer.id);

        const res = await fetch(`/api/employer/${employer.id}`);
        const data = await res.json();
        if (ignore || !data.employer) return;

        setForm((prev) => ({
          ...prev,
          companyName: data.employer.companyName || "",
          hrName: data.employer.hiringManagerName || data.employer.fullName || "",
          hrNumber: data.employer.hiringManagerPhone || data.employer.phone || "",
          industry: data.employer.industryType || "",
        }));
      } catch (err) {
        if (!ignore) router.replace("/employer/login");
      }
    }

    loadInitialContext();

    return () => {
      ignore = true;
    };
  }, [mode, router]);

  function updateField(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const payload = {
      employerId: mode === "employer" ? employerId : undefined,
      publishNow: mode === "admin",
      companyName: form.companyName,
      hrName: form.hrName,
      hrNumber: form.hrNumber,
      title: form.positionName,
      positionName: form.positionName,
      location: form.location,
      preferredCandidates: form.preferredCandidates,
      noticePeriod: form.noticePeriod,
      employmentType: form.employmentType,
      vacancies: Number(form.vacancies) || 1,
      salaryRange: form.salaryRange,
      experienceMin: Number(form.experienceRequired) || 0,
      experienceMax: Number(form.experienceRequired) || 0,
      qualificationRequired: form.qualificationRequired,
      skillsRequired: form.skillsRequired,
      description: form.description,
      workMode: form.workMode,
      workingDays: form.workingDays,
      shiftTiming: form.shiftTiming,
      industry: form.industry,
      cabFacility: form.cabFacility,
      mealFacility: form.mealFacility,
      requiredSoftwareTools: form.requiredSoftwareTools,
      languagesRequired: form.languagesRequired,
      interviewProcess: form.interviewProcess,
    };

    try {
      const admin = mode === "admin" ? JSON.parse(localStorage.getItem("admin") || "null") : null;
      const res = await fetch("/api/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(admin?.token ? { Authorization: `Bearer ${admin.token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(`Failed to post job: ${data.error || res.statusText}`);
        setLoading(false);
        return;
      }

      setMessage(
        mode === "admin"
          ? "Job posted successfully."
          : "Job submitted successfully. It will appear after admin approval."
      );
      setTimeout(
        () => router.push(mode === "admin" ? "/admin/dashboard" : "/employer/dashboard"),
        1000
      );
    } catch (err) {
      setMessage(String(err.message || err));
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-4 text-2xl font-bold text-[#0D1630]">Post a Job</h1>
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 ring-1 ring-gray-100">
        <section>
          <h2 className="text-lg font-bold text-[#0D1630]">Internal Details</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Field label="Company Name" name="companyName" value={form.companyName} onChange={updateField} required />
            <Field label="HR Name" name="hrName" value={form.hrName} onChange={updateField} required />
            <Field label="HR Number" name="hrNumber" value={form.hrNumber} onChange={updateField} required />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#0D1630]">Position Details</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Position Name" name="positionName" value={form.positionName} onChange={updateField} required />
            <Field label="Job Location" name="location" value={form.location} onChange={updateField} required />
            <SelectField label="Preferred Candidates" name="preferredCandidates" value={form.preferredCandidates} onChange={updateField} options={["Female Candidates", "Male Candidates", "Both"]} required />
            <Field label="Notice Period" name="noticePeriod" value={form.noticePeriod} onChange={updateField} required />
            <SelectField label="Employment Type" name="employmentType" value={form.employmentType} onChange={updateField} options={["Full Time", "Part Time", "Contract", "Internship"]} required />
            <Field label="Number of Openings" name="vacancies" value={form.vacancies} onChange={updateField} type="number" required />
            <Field label="Salary Range / Budget" name="salaryRange" value={form.salaryRange} onChange={updateField} required />
            <Field label="Experience Required" name="experienceRequired" value={form.experienceRequired} onChange={updateField} type="number" required />
            <Field label="Educational Qualification Required" name="qualificationRequired" value={form.qualificationRequired} onChange={updateField} required />
            <Field label="Key Skills Required" name="skillsRequired" value={form.skillsRequired} onChange={updateField} required />
          </div>
          <div className="mt-4">
            <TextArea label="Job Description" name="description" value={form.description} onChange={updateField} required />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#0D1630]">Work Details</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <SelectField label="Work Mode" name="workMode" value={form.workMode} onChange={updateField} options={["Work From Office", "Hybrid", "Remote"]} required />
            <Field label="Working Days" name="workingDays" value={form.workingDays} onChange={updateField} required />
            <Field label="Shift Timing" name="shiftTiming" value={form.shiftTiming} onChange={updateField} required />
            <Field label="Industry" name="industry" value={form.industry} onChange={updateField} required />
            <SelectField label="Cab Facility" name="cabFacility" value={form.cabFacility} onChange={updateField} options={["Yes", "No"]} required />
            <SelectField label="Meal Facility" name="mealFacility" value={form.mealFacility} onChange={updateField} options={["Yes", "No"]} required />
            <Field label="Required Software/Tools Knowledge" name="requiredSoftwareTools" value={form.requiredSoftwareTools} onChange={updateField} />
            <Field label="Languages Required" name="languagesRequired" value={form.languagesRequired} onChange={updateField} required />
          </div>
          <div className="mt-4">
            <TextArea label="Interview Process" name="interviewProcess" value={form.interviewProcess} onChange={updateField} required />
          </div>
        </section>

        <div className="flex items-center gap-3 border-t border-gray-100 pt-6">
          <button disabled={loading} className="rounded-full bg-[#0D1630] px-6 py-2 text-white">
            {loading ? "Posting..." : "Post job"}
          </button>
          <button
            type="button"
            onClick={() => router.push(mode === "admin" ? "/admin/dashboard" : "/employer/dashboard")}
            className="text-sm text-[#6F925C]"
          >
            Cancel
          </button>
        </div>

        {message && <div className="text-sm text-gray-700">{message}</div>}
      </form>
    </div>
  );
}
