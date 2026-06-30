import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
} from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Find Jobs", href: "/jobs" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Sign In", href: "/login" },
  ],
  Company: [
    { label: "About NextEdge", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Help Center", href: "/help" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#080F22] text-white">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 md:pt-20">
        <div className="grid gap-14 border-b border-white/10 pb-14 lg:grid-cols-[1.25fr_1fr]">
          <div className="max-w-lg">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6F925C]">
                <BriefcaseBusiness size={23} />
              </span>
              <span className="text-2xl font-black tracking-tight">
                Next<span className="text-[#A9C29A]">Edge</span>
              </span>
            </Link>

            <p className="mt-6 max-w-md leading-7 text-white/60">
              A focused career platform helping ambitious candidates discover
              verified opportunities from companies ready to hire.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <CheckCircle2 size={16} className="text-[#A9C29A]" />
                Verified opportunities
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <BriefcaseBusiness size={16} className="text-[#A9C29A]" />
                Career-focused tools
              </span>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#A9C29A]">
                  {title}
                </h2>
                <ul className="mt-5 space-y-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NextEdge. All rights reserved.</p>
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 font-semibold text-white/70 transition-colors hover:text-white"
          >
            Join the NextEdge network
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
