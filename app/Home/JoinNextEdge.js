import Link from "next/link";
import {
  ArrowRight,
  BadgeIndianRupee,
  BriefcaseBusiness,
  CheckCircle2,
  Sparkles,
  Users,
} from "lucide-react";

const candidateBenefits = [
  "Explore verified job opportunities",
  "Connect with trusted recruiters",
  "Apply through one simple profile",
];

const recruiterBenefits = [
  "Build your candidate network",
  "Share your unique referral code",
  "Earn ₹9 per successful subscription",
];

export default function JoinNextEdge() {
  return (
    <section className="bg-[#F8FAF7] px-6 py-24 md:py-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[#0D1630] px-6 py-16 text-white shadow-[0_30px_90px_rgba(13,22,48,0.22)] md:px-12 md:py-20 lg:px-16">
        <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#6F925C]/30" />
        <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-[#6F925C]/15 blur-[90px]" />

        <div className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#A9C29A]">
              <Sparkles size={16} />
              Your Next Move
            </div>

            <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
              One network. Two ways to
              <span className="text-[#A9C29A]"> move forward.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
              Find the opportunity that moves your career ahead, or help
              talented people get discovered while growing your own network.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <article className="group rounded-[32px] bg-white p-7 text-[#0D1630] transition-transform duration-300 hover:-translate-y-1 md:p-9">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6F925C]/10 text-[#6F925C]">
                  <BriefcaseBusiness size={27} />
                </div>

                <div className="rounded-full bg-[#F8FAF7] px-4 py-2 text-sm font-bold text-[#5F7D4F]">
                  Career Access · ₹99
                </div>
              </div>

              <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#6F925C]">
                For Candidates
              </p>
              <h3 className="mt-3 text-3xl font-black">
                Find work worth doing.
              </h3>
              <p className="mt-4 max-w-xl leading-7 text-gray-600">
                Create your profile and put your experience in front of
                recruiters hiring for relevant roles.
              </p>

              <ul className="mt-7 space-y-3">
                {candidateBenefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-3 text-sm font-medium text-[#0D1630]"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-[#6F925C]"
                    />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link
                href="/register?role=candidate"
                className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6F925C] px-6 py-4 font-bold text-white transition-colors hover:bg-[#5F7D4F] sm:w-auto"
              >
                Start Your Career Journey
                <ArrowRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </article>

            <article className="group rounded-[32px] border border-white/15 bg-white/[0.07] p-7 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 md:p-9">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6F925C] text-white">
                  <Users size={27} />
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-[#6F925C]/15 px-4 py-2 text-sm font-bold text-[#A9C29A]">
                  <BadgeIndianRupee size={17} />
                  Earn ₹9 / Subscription
                </div>
              </div>

              <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#A9C29A]">
                For HR Partners
              </p>
              <h3 className="mt-3 text-3xl font-black">
                Turn connections into impact.
              </h3>
              <p className="mt-4 max-w-xl leading-7 text-white/65">
                Introduce candidates to a trusted opportunity network and earn
                whenever a referral activates their subscription.
              </p>

              <ul className="mt-7 space-y-3">
                {recruiterBenefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-3 text-sm font-medium text-white/90"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-[#A9C29A]"
                    />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link
                href="/register?role=recruiter"
                className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white px-6 py-4 font-bold text-[#0D1630] transition-colors hover:bg-[#F0F4EE] sm:w-auto"
              >
                Become an HR Partner
                <ArrowRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </article>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/55">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#A9C29A]" />
              Verified opportunities
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#A9C29A]" />
              Trusted recruiter network
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#A9C29A]" />
              Simple onboarding
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
