import {
  BadgeCheck,
  CheckCircle2,
  Clock3,
  FileUser,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Verified opportunities",
    description:
      "Explore listings reviewed for relevance so you can focus your energy on serious roles.",
  },
  {
    icon: Users,
    title: "Direct employer visibility",
    description:
      "Put a complete professional profile in front of companies searching for relevant talent.",
  },
  {
    icon: FileUser,
    title: "One profile, more reach",
    description:
      "Keep your experience in one complete profile and use it across suitable applications.",
  },
  {
    icon: Clock3,
    title: "A simpler hiring journey",
    description:
      "Move from discovery to application without unnecessary steps or confusing handoffs.",
  },
];

export default function WhyNextEdge() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-28">
      <div className="absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-[#6F925C]/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="rounded-[40px] bg-[#0D1630] p-7 text-white shadow-[0_30px_80px_rgba(13,22,48,0.22)] md:p-10">
            <div className="flex items-center justify-between gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6F925C]">
                <BadgeCheck size={28} />
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#A9C29A]">
                Profile Verified
              </span>
            </div>

            <div className="mt-10">
              <p className="text-sm font-semibold text-white/55">
                Opportunity match
              </p>
              <div className="mt-3 flex items-end justify-between gap-5">
                <p className="text-4xl font-black md:text-5xl">92%</p>
                <p className="pb-1 text-sm text-white/55">Strong match</p>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[92%] rounded-full bg-[#6F925C]" />
              </div>
            </div>

            <div className="mt-9 space-y-4 border-t border-white/10 pt-8">
              {[
                "Skills aligned with the role",
                "Experience range matched",
                "Profile ready to apply",
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

          <div className="absolute -bottom-8 -right-3 rounded-3xl border border-[#0D1630]/10 bg-white p-5 shadow-[0_16px_50px_rgba(13,22,48,0.12)] sm:-right-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6F925C]/10 text-[#6F925C]">
                <Sparkles size={21} />
              </div>
              <div>
                <p className="font-bold text-[#0D1630]">Better matches</p>
                <p className="mt-1 text-xs text-gray-500">Less time searching</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#6F925C]">
            Why NextEdge
          </span>
          <h2 className="mt-4 text-4xl font-black leading-tight text-[#0D1630] md:text-5xl">
            Built to make every career connection count.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            NextEdge brings candidates and employers into a more focused
            opportunity platform, with clarity at every step.
          </p>

          {/* image5 placeholder */}
          <div className="mt-6 image-slot" data-name="image5">image5</div>

          <div className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div key={benefit.title}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6F925C]/10 text-[#6F925C]">
                    <Icon size={21} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#0D1630]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 leading-7 text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
