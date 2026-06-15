import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileUser,
  Search,
  Sparkles,
} from "lucide-react";

const benefits = [
  "Build one complete professional profile",
  "Explore verified opportunities across industries",
  "Apply to relevant roles through a simple process",
];

export default function JoinNextEdge() {
  return (
    <section className="bg-[#F8FAF7] px-6 py-24 md:py-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[#0D1630] px-6 py-16 text-white shadow-[0_30px_90px_rgba(13,22,48,0.22)] md:px-12 md:py-20 lg:px-16">
        <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#6F925C]/30" />
        <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-[#6F925C]/15 blur-[90px]" />

        <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#A9C29A]">
              <Sparkles size={16} />
              Your Next Move
            </div>

            <h2 className="mt-6 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              Your next opportunity
              <span className="text-[#A9C29A]"> starts with one profile.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
              Join a focused career platform built to help you discover better
              roles and move through applications with clarity.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 text-sm font-medium text-white/85"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-[#A9C29A]"
                  />
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-2xl bg-[#6F925C] px-7 py-4 font-bold text-white transition-colors hover:bg-[#5F7D4F]"
              >
                Get Started for ₹99
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center rounded-2xl border border-white/20 px-7 py-4 font-bold text-white transition-colors hover:bg-white/10"
              >
                Browse Jobs
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              {
                icon: FileUser,
                value: "One Profile",
                label: "Showcase your complete career story",
              },
              {
                icon: Search,
                value: "Smarter Discovery",
                label: "Find roles aligned with your goals",
              },
              {
                icon: BriefcaseBusiness,
                value: "1,800+ Roles",
                label: "Explore active opportunities",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.value}
                  className="flex items-center gap-5 rounded-[24px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#6F925C] text-white">
                    <Icon size={23} />
                  </div>
                  <div>
                    <p className="text-lg font-black">{item.value}</p>
                    <p className="mt-1 text-sm text-white/55">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
