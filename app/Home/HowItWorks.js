"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  CreditCard,
  FileText,
  Trophy,
  User,
} from "lucide-react";
import Link from "next/link";

const candidateFlow = [
  {
    icon: User,
    step: "01",
    title: "Create Your Account",
    description: "Register in a few moments and begin your career journey.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Complete Your Profile",
    description: "Showcase your experience, skills, and career preferences.",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "Activate Access",
    description: "Unlock the full opportunity network with one simple plan.",
  },
  {
    icon: BriefcaseBusiness,
    step: "04",
    title: "Apply to Jobs",
    description: "Discover relevant roles and submit focused applications.",
  },
  {
    icon: Trophy,
    step: "05",
    title: "Move Forward",
    description: "Track progress and take your next career step confidently.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#F8FAF7] py-24 md:py-28"
    >
      <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-[#6F925C]/5 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#0D1630]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-[#6F925C]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#6F925C]">
            How It Works
          </span>
          <h2 className="mt-6 text-4xl font-black text-[#0D1630] md:text-6xl">
            From profile to opportunity
            <span className="block text-[#6F925C]">in five clear steps.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            A focused journey designed to help you spend less time navigating
            and more time applying to roles that fit.
          </p>
        
          {/* image6 placeholder */}
          <div className="mx-auto mt-6 max-w-3xl image-slot" data-name="image6">image6</div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {candidateFlow.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.45 }}
                className="relative rounded-[28px] border border-[#0D1630]/8 bg-white p-6 shadow-sm"
              >
                <span className="absolute right-5 top-5 text-sm font-black text-[#6F925C]/35">
                  {item.step}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6F925C]/10 text-[#6F925C]">
                  <Icon size={23} />
                </div>
                <h3 className="mt-7 text-lg font-bold text-[#0D1630]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center justify-between gap-8 rounded-[32px] bg-[#0D1630] p-8 text-white md:flex-row md:p-10"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#A9C29A]">
              Career Access
            </p>
            <h3 className="mt-3 text-3xl font-black">Get started for ₹99</h3>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65">
              {[
                "Verified listings",
                "Complete candidate profile",
                "Simple applications",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#A9C29A]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/signup"
            className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#6F925C] px-7 py-4 font-bold transition-colors hover:bg-[#5F7D4F] md:w-auto"
          >
            Create Your Profile
            <ArrowRight
              size={19}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
