import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Compass,
  FileUser,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

export const metadata = {
  title: "About Us",
  description:
    "Learn how NextEdge helps professionals build stronger profiles, discover verified jobs, and approach their next career move with clarity.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Trust before volume",
    description:
      "We prioritize clear, relevant opportunities so candidates can focus on roles worth their time.",
  },
  {
    icon: Target,
    title: "Relevance over noise",
    description:
      "Career discovery should feel focused. Better context leads to more intentional applications.",
  },
  {
    icon: Compass,
    title: "Clarity at every step",
    description:
      "From building a profile to applying for a role, each action should feel understandable and purposeful.",
  },
];

const experience = [
  {
    icon: FileUser,
    number: "01",
    title: "Tell your career story",
    description:
      "Bring your experience, skills, and preferences together in one complete professional profile.",
  },
  {
    icon: Search,
    number: "02",
    title: "Discover relevant work",
    description:
      "Explore verified opportunities across industries, locations, and experience levels.",
  },
  {
    icon: BriefcaseBusiness,
    number: "03",
    title: "Apply with confidence",
    description:
      "Use a simpler application journey to focus on the roles that genuinely fit your next move.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#FAFAFA] py-10">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#6F925C]/10 blur-[140px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#0D1630]/5 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6F925C]/20 bg-[#6F925C]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#5F7D4F]">
              <Sparkles size={16} />
              About NextEdge
            </div>
            <h1 className="mt-6 text-5xl font-black leading-tight text-[#0D1630] md:text-7xl">
              Better career moves begin with
              <span className="text-[#6F925C]"> better clarity.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600">
              NextEdge is a career opportunity platform designed to help
              professionals present their experience clearly, discover
              verified roles, and move through applications with confidence.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/jobs"
                className="group inline-flex items-center gap-2 rounded-2xl bg-[#6F925C] px-7 py-4 font-bold text-white transition-colors hover:bg-[#5F7D4F]"
              >
                Explore Opportunities
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/contact"
                className="rounded-2xl border border-[#0D1630]/15 bg-white px-7 py-4 font-bold text-[#0D1630] transition-colors hover:border-[#0D1630] hover:bg-[#0D1630] hover:text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="rounded-[40px] bg-[#0D1630] p-8 text-white shadow-[0_30px_90px_rgba(13,22,48,0.22)] md:p-10">
              <div className="flex items-start justify-between gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6F925C]">
                  <BadgeCheck size={28} />
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#A9C29A]">
                  Career Ready
                </span>
              </div>

              <h2 className="mt-10 text-3xl font-black">
                One profile built around your potential.
              </h2>
              <p className="mt-4 leading-7 text-white/60">
                Your experience is more than a list of jobs. NextEdge helps
                organize the details employers need to understand your fit.
              </p>

              <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
                {[
                  "Skills and experience in one place",
                  "Preferences that guide discovery",
                  "A focused path to relevant roles",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-white/80"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-[#A9C29A]"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-8 -left-3 flex items-center gap-4 rounded-3xl border border-[#0D1630]/10 bg-white p-5 shadow-[0_18px_50px_rgba(13,22,48,0.12)] sm:-left-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6F925C]/10 text-[#6F925C]">
                <Building2 size={23} />
              </div>
              <div>
                <p className="text-xl font-black text-[#0D1630]">350+</p>
                <p className="text-sm text-gray-500">companies hiring</p>
              </div>
            </div>
            {/* image8 placeholder */}
            <div className="image-slot mt-6" data-name="image8">image8</div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#6F925C]">
              Our Purpose
            </span>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#0D1630] md:text-5xl">
              Make opportunity discovery feel less overwhelming.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-gray-600">
            <p>
              Finding the right role often means navigating scattered
              listings, repeating the same information, and applying without
              enough context. That process can make talented people feel
              invisible.
            </p>
            <p>
              NextEdge brings profile building, job discovery, and
              applications into one focused experience. The goal is simple:
              help candidates understand where they fit and take each next
              step with greater confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAF7] py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#6F925C]">
              What Guides Us
            </span>
            <h2 className="mt-4 text-4xl font-black text-[#0D1630] md:text-5xl">
              A more thoughtful career platform.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-[32px] border border-[#0D1630]/8 bg-white p-8 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6F925C]/10 text-[#6F925C]">
                    <Icon size={23} />
                  </div>
                  <h3 className="mt-7 text-xl font-bold text-[#0D1630]">
                    {value.title}
                  </h3>
                  <p className="mt-3 leading-7 text-gray-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#6F925C]">
                The Experience
              </span>
              <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight text-[#0D1630] md:text-5xl">
                Designed around your next career step.
              </h2>
            </div>
            <p className="max-w-md text-lg leading-8 text-gray-600">
              A straightforward journey from presenting your strengths to
              finding work that matches them.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {experience.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="relative overflow-hidden rounded-[32px] bg-[#0D1630] p-8 text-white"
                >
                  <span className="absolute right-6 top-4 text-6xl font-black text-white/5">
                    {item.number}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6F925C]">
                    <Icon size={23} />
                  </div>
                  <h3 className="mt-8 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-white/60">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAF7] px-6 py-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[#6F925C] px-7 py-14 text-center text-white md:px-12 md:py-18">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/15" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-4xl font-black md:text-5xl">
              Ready to make your next move?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
              Build your profile, explore verified opportunities, and begin a
              more focused job search.
            </p>
            <Link
              href="/register"
              className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-[#0D1630] transition-colors hover:bg-[#F0F4EE]"
            >
              Create Your Profile
              <ArrowRight
                size={19}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
