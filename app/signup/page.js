"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  class10: "",
  class12: "",
  graduation: "",
  postGraduation: "",
  otherQualifications: "",
  languagesKnown: "",
  maritalStatus: "",
  keySkills: "",
  projects: "",
  linkedInId: "",
  instagram: "",
  otherSocialProfile: "",
  currentLocation: "",
  currentOrganization: "",
  totalExperience: "",
  currentCTC: "",
  expectedCTC: "",
  noticePeriod: "",
  reasonForJobChange: "",
  resumeFile: "",
  profileVideo: "",
  referralCode: "",
};

const breakdown = {
  baseAmount: 99,
  gstAmount: 17.82,
  totalAmount: 116.82,
};

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

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
        className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6F925C]"
      />
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
        className="mt-2 h-24 w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6F925C]"
      />
    </label>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setShowPayment(true);
  }

  async function startPayment() {
    setLoading(true);
    setError("");

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setError("Could not load Razorpay. Please try again.");
        setLoading(false);
        return;
      }

      const orderRes = await fetch("/api/payments/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const order = await orderRes.json();

      if (!orderRes.ok) {
        setError(order.error || "Could not start payment");
        setLoading(false);
        return;
      }

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "NextEdge-Talent",
        description: "Candidate registration",
        order_id: order.orderId,
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.phone,
        },
        handler: async (response) => {
          const verifyRes = await fetch("/api/payments/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verified = await verifyRes.json();

          if (!verifyRes.ok) {
            setError(verified.error || "Payment verification failed");
            setLoading(false);
            return;
          }

          setLoading(false);
          setShowPayment(false);
          router.push("/login?signup=success");
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
        theme: {
          color: "#0D1630",
        },
      });

      checkout.open();
    } catch (err) {
      setError(String(err.message || err));
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#0D1630]">
          Candidate Information Form
        </h1>
        <p className="mt-2 text-gray-600">
          Complete your details and pay the registration amount to create your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <section>
          <h2 className="text-xl font-bold text-[#0D1630]">Basic Information</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Full Name" name="fullName" value={form.fullName} onChange={updateField} required />
            <Field label="Email ID" name="email" value={form.email} onChange={updateField} type="email" required />
            <Field label="Contact Number" name="phone" value={form.phone} onChange={updateField} required />
            <Field label="Date of Birth" name="dateOfBirth" value={form.dateOfBirth} onChange={updateField} type="date" required />
            <Field label="Referral Code" name="referralCode" value={form.referralCode} onChange={updateField} required />
            <Field label="Marital Status" name="maritalStatus" value={form.maritalStatus} onChange={updateField} />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0D1630]">Educational Qualification</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Class 10" name="class10" value={form.class10} onChange={updateField} required />
            <Field label="Class 12" name="class12" value={form.class12} onChange={updateField} required />
            <Field label="Graduation" name="graduation" value={form.graduation} onChange={updateField} />
            <Field label="Post Graduation" name="postGraduation" value={form.postGraduation} onChange={updateField} />
            <Field label="Other Qualifications/Certifications" name="otherQualifications" value={form.otherQualifications} onChange={updateField} />
            <Field label="Languages Known" name="languagesKnown" value={form.languagesKnown} onChange={updateField} required />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0D1630]">Professional Details</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Key Skills" name="keySkills" value={form.keySkills} onChange={updateField} required />
            <Field label="Current Location" name="currentLocation" value={form.currentLocation} onChange={updateField} required />
            <Field label="Current Organization" name="currentOrganization" value={form.currentOrganization} onChange={updateField} required />
            <Field label="Total Experience" name="totalExperience" value={form.totalExperience} onChange={updateField} type="number" required />
            <Field label="Current CTC" name="currentCTC" value={form.currentCTC} onChange={updateField} type="number" required />
            <Field label="Expected CTC" name="expectedCTC" value={form.expectedCTC} onChange={updateField} type="number" required />
            <Field label="Notice Period" name="noticePeriod" value={form.noticePeriod} onChange={updateField} required />
            <Field label="Resume" name="resumeFile" value={form.resumeFile} onChange={updateField} required />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <TextArea label="Projects (if any)" name="projects" value={form.projects} onChange={updateField} />
            <TextArea label="Reason for Job Change" name="reasonForJobChange" value={form.reasonForJobChange} onChange={updateField} required />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0D1630]">Social Media Profiles</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="LinkedIn ID" name="linkedInId" value={form.linkedInId} onChange={updateField} required />
            <Field label="Instagram" name="instagram" value={form.instagram} onChange={updateField} />
            <Field label="Other" name="otherSocialProfile" value={form.otherSocialProfile} onChange={updateField} />
            <Field label="Profile Video" name="profileVideo" value={form.profileVideo} onChange={updateField} />
          </div>
        </section>

        {error && <div className="text-sm font-semibold text-red-600">{error}</div>}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-[#0D1630] px-7 py-3 font-bold text-white disabled:opacity-60"
          >
            Complete Payment
          </button>
          <Link href="/login" className="text-sm font-semibold text-[#6F925C]">
            Already have an account?
          </Link>
        </div>
      </form>

      {showPayment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-black text-[#0D1630]">Payment Breakdown</h2>
            <div className="mt-5 space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Registration amount</span>
                <span>₹{breakdown.baseAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST 18%</span>
                <span>₹{breakdown.gstAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3 text-lg font-black text-[#0D1630]">
                <span>Total</span>
                <span>₹{breakdown.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              After payment, your candidate account will be created and you will be sent to the login page. Use your contact number as the initial password.
            </p>

            {error && <div className="mt-4 text-sm font-semibold text-red-600">{error}</div>}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPayment(false)}
                disabled={loading}
                className="rounded-full border border-gray-200 px-5 py-2 font-semibold text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={startPayment}
                disabled={loading}
                className="rounded-full bg-[#6F925C] px-5 py-2 font-semibold text-white disabled:opacity-60"
              >
                {loading ? "Opening Razorpay..." : "Pay with Razorpay"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
