"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  designation: "",
  companyWebsite: "",
  industryType: "",
  linkedInCompanyPage: "",
  facebook: "",
  instagram: "",
  twitter: "",
  other: "",
  genderPreference: "",
  hiringManagerName: "",
  hiringManagerPhone: "",
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

export default function CreateEmployerPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  function updateField(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const payload = {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        companyName: form.companyName,
        designation: form.designation,
        companyWebsite: form.companyWebsite,
        industryType: form.industryType,
        linkedInCompanyPage: form.linkedInCompanyPage,
        socialMediaLinks: {
          facebook: form.facebook,
          instagram: form.instagram,
          twitter: form.twitter,
          other: form.other,
        },
        genderPreference: form.genderPreference,
        hiringManagerName: form.hiringManagerName,
        hiringManagerPhone: form.hiringManagerPhone,
      };

      const res = await fetch("/api/admin/create-employer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed");
        setLoading(false);
        return;
      }

      setMessage(
        `Employer created: ${data.employer?.referralCode || ""}. Initial password is the contact number.`
      );
      setTimeout(() => router.push("/admin/dashboard"), 1600);
    } catch (err) {
      setMessage(String(err.message || err));
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-4 text-2xl font-bold text-[#0D1630]">
        Create Employer
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 ring-1 ring-gray-100">
        <section>
          <h2 className="text-lg font-bold text-[#0D1630]">Basic Information</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Full Name" name="fullName" value={form.fullName} onChange={updateField} required />
            <Field label="Email ID" name="email" type="email" value={form.email} onChange={updateField} required />
            <Field label="Contact Number" name="phone" value={form.phone} onChange={updateField} required />
            <Field label="Company Name" name="companyName" value={form.companyName} onChange={updateField} required />
            <Field label="Designation" name="designation" value={form.designation} onChange={updateField} required />
            <Field label="Company Website" name="companyWebsite" value={form.companyWebsite} onChange={updateField} />
            <Field label="Industry Type" name="industryType" value={form.industryType} onChange={updateField} required />
            <Field label="LinkedIn Company Page" name="linkedInCompanyPage" value={form.linkedInCompanyPage} onChange={updateField} />
            <Field label="Gender Preference (if any)" name="genderPreference" value={form.genderPreference} onChange={updateField} />
            <Field label="Hiring Manager Name" name="hiringManagerName" value={form.hiringManagerName} onChange={updateField} />
            <Field label="Hiring Manager Contact Number" name="hiringManagerPhone" value={form.hiringManagerPhone} onChange={updateField} />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#0D1630]">Social Media Links</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Facebook" name="facebook" value={form.facebook} onChange={updateField} />
            <Field label="Instagram" name="instagram" value={form.instagram} onChange={updateField} />
            <Field label="Twitter/X" name="twitter" value={form.twitter} onChange={updateField} />
            <Field label="Other" name="other" value={form.other} onChange={updateField} />
          </div>
        </section>

        <div className="flex items-center gap-3 border-t border-gray-100 pt-6">
          <button disabled={loading} className="rounded-full bg-[#0D1630] px-6 py-2 text-white">
            {loading ? "Creating..." : "Create"}
          </button>
        </div>

        {message && <div className="text-sm text-gray-700">{message}</div>}
      </form>
    </div>
  );
}
