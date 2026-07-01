"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
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
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      if (data && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("nextedge-auth-change"));
      }

      setLoading(false);
      router.push("/");
    } catch (err) {
      setError(String(err.message || err));
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg ring-1 ring-gray-100">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="logo" className="h-10 w-auto object-contain" />
            <h1 className="text-2xl font-semibold text-[#0D1630]">Candidate Sign in</h1>
          </div>

          {/* image11 placeholder */}
          <div className="image-slot" data-name="image11">image11</div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6F925C]"
              />
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0D1630] px-6 py-2 text-sm font-semibold text-white shadow hover:bg-[#152247] disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <div className="flex flex-col items-start gap-2 text-sm sm:items-end">
                <Link href="/forgot" className="text-[#6F925C] hover:underline">
                  Forgot password?
                </Link>
                <Link href="/signup" className="text-[#6F925C] hover:underline">
                  Create account
                </Link>
              </div>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-gray-400">
            New paid accounts can use their contact number as the initial password.
          </div>
        </div>
      </div>
    </div>
  );
}
