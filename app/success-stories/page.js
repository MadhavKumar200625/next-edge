import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Code2,
  Headphones,
  IndianRupee,
  MapPin,
  Palette,
  Quote,
  Route,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export const metadata = {
  title: "Success Stories",
  description:
    "Explore representative Indian career journeys across technology, finance, design, operations, and customer support.",
};

const stories = [
  {
    initials: "AM",
    name: "Aditi Mishra",
    location: "Lucknow to Bengaluru",
    before: "Technical Support Associate",
    after: "QA Engineer",
    experience: "2.5 years",
    outcome: "Switched into tech",
    icon: Code2,
    tone: "light",
    quote:
      "I had technical skills but my profile only showed support work. Reframing my experience around testing, bug reporting, and product knowledge helped me apply for roles that matched what I could actually do.",
  },
  {
    initials: "RS",
    name: "Rohan Shah",
    location: "Ahmedabad",
    before: "Accounts Executive",
    after: "Financial Analyst",
    experience: "3 years",
    outcome: "32% salary growth",
    icon: BarChart3,
    tone: "green",
    quote:
      "I stopped applying to every finance opening and focused on roles where my Excel, reporting, and reconciliation experience mattered. The interviews became much more relevant.",
  },
  {
    initials: "SK",
    name: "Sana Khan",
    location: "Bhopal to Pune",
    before: "Freelance Designer",
    after: "Product Designer",
    experience: "4 years",
    outcome: "First product role",
    icon: Palette,
    tone: "navy",
    quote:
      "My work was scattered across freelance projects. Presenting it as a clear product story helped companies understand my process, not just the final screens.",
  },
  {
    initials: "NV",
    name: "Nikhil Verma",
    location: "Jaipur to Gurugram",
    before: "Customer Support Executive",
    after: "Operations Coordinator",
    experience: "2 years",
    outcome: "Career direction changed",
    icon: Headphones,
    tone: "navy",
    quote:
      "I wanted to move away from voice support but did not know how transferable my skills were. Highlighting escalations, reporting, and process ownership opened a different path.",
  },
  {
    initials: "LI",
    name: "Lakshmi Iyer",
    location: "Chennai",
    before: "Career break",
    after: "Business Operations Analyst",
    experience: "6 years",
    outcome: "Returned after 3 years",
    icon: BriefcaseBusiness,
    tone: "light",
    quote:
      "Returning after a career break felt intimidating. A focused profile helped me explain the break honestly while bringing attention back to the experience I had already built.",
  },
  {
    initials: "AP",
    name: "Arjun Patil",
    location: "Nashik to Hyderabad",
    before: "Junior Java Developer",
    after: "Backend Engineer",
    experience: "2 years",
    outcome: "Moved to a product team",
    icon: Code2,
    tone: "green",
    quote:
      "The biggest change was applying selectively. Once my profile showed APIs, databases, and project impact clearly, I started getting conversations for stronger backend roles.",
  },
];

const toneStyles = {
  light: {
    card: "border border-[#0D1630]/10 bg-white text-[#0D1630]",
    icon: "bg-[#6F925C]/10 text-[#6F925C]",
    avatar: "bg-[#0D1630] text-white",
    muted: "text-gray-500",
    badge: "bg-[#6F925C]/10 text-[#5F7D4F]",
  },
  green: {
    card: "bg-[#6F925C] text-white",
    icon: "bg-white/15 text-white",
    avatar: "bg-white text-[#5F7D4F]",
    muted: "text-white/70",
    badge: "bg-white/15 text-white",
  },
  navy: {
    card: "bg-[#0D1630] text-white",
    icon: "bg-white/10 text-[#A9C29A]",
    avatar: "bg-[#6F925C] text-white",
    muted: "text-white/65",
    badge: "bg-white/10 text-white",
  },
};

const careerLessons = [
  {
    icon: Route,
    title: "Your path does not need to be linear",
    description:
      "Support, freelance, operations, and career-break experience can all lead to a strong next step when the transferable skills are clear.",
  },
  {
    icon: BadgeCheck,
    title: "A focused profile changes the conversation",
    description:
      "Employers understand your fit faster when responsibilities are translated into skills, outcomes, and relevant experience.",
  },
  {
    icon: TrendingUp,
    title: "Better fit matters more than more applications",
    description:
      "Selective applications create stronger conversations than sending the same profile to every available opening.",
  },
];

export default function SuccessStoriesPage() {
  const featuredStory = stories[0];

  return (
    <>
      <section className="relative overflow-hidden bg-[#FAFAFA] py-20 md:py-28">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#6F925C]/10 blur-[140px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#0D1630]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6F925C]/20 bg-[#6F925C]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#5F7D4F]">
            <Sparkles size={16} />
            Indian Career Journeys
          </div>
          <h1 className="mx-auto mt-6 max-w-5xl text-5xl font-black leading-tight text-[#0D1630] md:text-7xl">
            Different beginnings.
            <span className="text-[#6F925C]"> Meaningful next chapters.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-gray-600">
            Career growth in India rarely follows one perfect route. These
            representative journeys show how clearer profiles, focused
            applications, and relevant opportunities can create momentum.
          </p>

          <div className="mx-auto mt-8 inline-flex max-w-3xl items-start gap-3 rounded-2xl border border-[#0D1630]/8 bg-white px-5 py-4 text-left text-sm leading-6 text-gray-600 shadow-sm">
            <BadgeCheck
              size={19}
              className="mt-0.5 shrink-0 text-[#6F925C]"
            />
            <p>
              These are representative candidate profiles created for the
              NextEdge experience. Names and details are illustrative until
              verified customer testimonials are approved for publication.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid overflow-hidden rounded-[40px] bg-[#0D1630] shadow-[0_30px_90px_rgba(13,22,48,0.2)] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative overflow-hidden bg-[#6F925C] p-8 text-white md:p-12">
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border border-white/15" />
              <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-white/10 blur-[70px]" />

              <div className="relative">
                <div className="flex items-start justify-between gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-xl font-black text-[#5F7D4F]">
                    {featuredStory.initials}
                  </div>
                  <Quote size={38} className="text-white/30" />
                </div>

                <p className="mt-10 text-sm font-bold uppercase tracking-[0.18em] text-white/65">
                  Featured Journey
                </p>
                <h2 className="mt-3 text-4xl font-black">
                  From technical support to software quality.
                </h2>
                <blockquote className="mt-7 text-xl font-semibold leading-9">
                  “{featuredStory.quote}”
                </blockquote>

                <div className="mt-10 border-t border-white/20 pt-7">
                  <p className="text-xl font-black">{featuredStory.name}</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-white/70">
                    <MapPin size={16} />
                    {featuredStory.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 text-white md:p-12">
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#A9C29A]">
                The Career Move
              </span>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-white/50">Previous role</p>
                  <p className="mt-2 text-lg font-bold">
                    {featuredStory.before}
                  </p>
                </div>
                <div className="rounded-[24px] bg-[#6F925C]/15 p-5">
                  <p className="text-sm text-[#A9C29A]">Next role</p>
                  <p className="mt-2 text-lg font-bold">
                    {featuredStory.after}
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-5">
                {[
                  {
                    title: "The challenge",
                    text: "Her day-to-day work included reproducing bugs, documenting issues, and explaining product behaviour, but her title kept her out of QA searches.",
                  },
                  {
                    title: "The shift",
                    text: "She reorganized her profile around testing exposure, technical troubleshooting, SQL basics, and the product knowledge gained in support.",
                  },
                  {
                    title: "The outcome",
                    text: "A more focused search helped her move toward entry-level QA opportunities where her existing experience became an advantage.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <CheckCircle2
                      size={20}
                      className="mt-1 shrink-0 text-[#A9C29A]"
                    />
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="mt-1 leading-7 text-white/60">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                {["Manual testing", "Bug reporting", "SQL basics"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAF7] py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#6F925C]">
                More Journeys
              </span>
              <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight text-[#0D1630] md:text-5xl">
                Career growth looks different for everyone.
              </h2>
            </div>
            <p className="max-w-md text-lg leading-8 text-gray-600">
              From changing cities to returning after a break, every next step
              starts from a different place.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stories.slice(1).map((story) => {
              const Icon = story.icon;
              const styles = toneStyles[story.tone];

              return (
                <article
                  key={story.name}
                  className={`flex min-h-[480px] flex-col rounded-[32px] p-8 shadow-[0_18px_55px_rgba(13,22,48,0.08)] ${styles.card}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${styles.icon}`}
                    >
                      <Icon size={23} />
                    </div>
                    <span
                      className={`rounded-full px-3 py-2 text-xs font-bold ${styles.badge}`}
                    >
                      {story.outcome}
                    </span>
                  </div>

                  <blockquote className="mt-8 text-lg font-semibold leading-8">
                    “{story.quote}”
                  </blockquote>

                  <div className="mt-auto pt-9">
                    <div className="mb-6 flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-black ${styles.avatar}`}
                      >
                        {story.initials}
                      </div>
                      <div>
                        <h3 className="font-bold">{story.name}</h3>
                        <p className={`mt-1 text-sm ${styles.muted}`}>
                          {story.location} · {story.experience}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t pt-6 ${
                        story.tone === "light"
                          ? "border-[#0D1630]/10"
                          : "border-white/15"
                      }`}
                    >
                      <div>
                        <p className={`text-xs ${styles.muted}`}>From</p>
                        <p className="mt-1 text-sm font-bold">{story.before}</p>
                      </div>
                      <ArrowRight size={17} className={styles.muted} />
                      <div>
                        <p className={`text-xs ${styles.muted}`}>To</p>
                        <p className="mt-1 text-sm font-bold">{story.after}</p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#6F925C]">
              What These Stories Show
            </span>
            <h2 className="mt-4 text-4xl font-black text-[#0D1630] md:text-5xl">
              Progress begins when your experience is understood.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {careerLessons.map((lesson) => {
              const Icon = lesson.icon;

              return (
                <article
                  key={lesson.title}
                  className="rounded-[30px] border border-[#0D1630]/8 bg-white p-8 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6F925C]/10 text-[#6F925C]">
                    <Icon size={23} />
                  </div>
                  <h3 className="mt-7 text-xl font-bold text-[#0D1630]">
                    {lesson.title}
                  </h3>
                  <p className="mt-3 leading-7 text-gray-600">
                    {lesson.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-14 grid gap-5 rounded-[32px] bg-[#F8FAF7] p-7 sm:grid-cols-3 md:p-9">
            {[
              {
                icon: Building2,
                value: "Multiple cities",
                label: "Local, relocation, and remote journeys",
              },
              {
                icon: BriefcaseBusiness,
                value: "Different stages",
                label: "Freshers, switchers, and returners",
              },
              {
                icon: IndianRupee,
                value: "Practical growth",
                label: "Better fit, direction, and earning potential",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.value} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#6F925C] shadow-sm">
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="font-black text-[#0D1630]">{item.value}</p>
                    <p className="mt-1 text-sm text-gray-500">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAF7] px-6 py-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[#0D1630] px-7 py-14 text-center text-white md:px-12 md:py-18">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -bottom-36 -left-24 h-80 w-80 rounded-full bg-[#6F925C]/15 blur-[80px]" />

          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-4xl font-black md:text-5xl">
              Your career story is still being written.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/65">
              Build a profile that shows what you can do and explore
              opportunities aligned with where you want to go next.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 rounded-2xl bg-[#6F925C] px-7 py-4 font-bold text-white transition-colors hover:bg-[#5F7D4F]"
              >
                Create Your Profile
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/jobs"
                className="rounded-2xl border border-white/20 px-7 py-4 font-bold text-white transition-colors hover:bg-white/10"
              >
                Explore Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
