"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // first call signup API (requires referralCode)
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, password, referralCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      // simulate payment: call subscription subscribe endpoint to activate plan
      if (data && data.user) {
        const token = data.user.token;
        const payRes = await fetch("/api/subscription/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const payData = await payRes.json();
        if (!payRes.ok) {
          // payment failed — still store user but show message
          setError(payData.error || "Payment failed — please try again");
          setLoading(false);
          return;
        }

        // merge payment info into user payload
        const updatedUser = { ...data.user, hasActivePlan: payData.hasActivePlan, planExpiryDate: payData.planExpiryDate };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      setLoading(false);
      router.push("/jobs");
    } catch (err) {
      setError(String(err.message || err));
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg ring-1 ring-gray-100">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="logo" className="h-10 w-auto object-contain" />
            <h1 className="text-2xl font-semibold text-[#0D1630]">Create your Candidate account</h1>
          </div>

          {/* image12 placeholder */}
          <div className="image-slot" data-name="image12">image12</div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6F925C]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6F925C]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6F925C]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6F925C]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Referral code</label>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                required
                placeholder="Enter employer referral code"
                className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6F925C]"
              />
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div className="flex items-center justify-between mt-2">
              <button
                type="submit"
                disabled={true}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0D1630] px-6 py-2 text-sm font-semibold text-white shadow hover:bg-[#152247] disabled:opacity-60"
              >
                {loading ? "Processing..." : "Make Payment"}
              </button>

              <Link href="/login" className="text-sm text-[#6F925C] hover:underline">
                Already have an account?
              </Link>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-gray-400">
            We value your privacy — your data is safe with us.
          </div>
        </div>
      </div>
    </div>
  );
}
