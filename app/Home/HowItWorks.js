"use client";

import { motion } from "framer-motion";
import {
  User,
  FileText,
  CreditCard,
  BriefcaseBusiness,
  Trophy,
  Users,
  Share2,
  BadgeIndianRupee,
  ArrowDown,
} from "lucide-react";

const candidateFlow = [
  {
    icon: User,
    title: "Register",
  },
  {
    icon: FileText,
    title: "Complete Profile",
  },
  {
    icon: CreditCard,
    title: "Activate Plan",
  },
  {
    icon: BriefcaseBusiness,
    title: "Apply Jobs",
  },
  {
    icon: Trophy,
    title: "Get Hired",
  },
];

const recruiterFlow = [
  {
    icon: Users,
    title: "Join Network",
  },
  {
    icon: FileText,
    title: "Referral Code",
  },
  {
    icon: Share2,
    title: "Refer Talent",
  },
  {
    icon: CreditCard,
    title: "Subscription",
  },
  {
    icon: BadgeIndianRupee,
    title: "Earn ₹9",
  },
];

export default function EcosystemSection() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAF7] py-28">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-[#6F925C]/5 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[#0D1630]/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="text-center">
          <span className="inline-flex rounded-full bg-[#6F925C]/10 px-4 py-2 text-sm font-semibold text-[#6F925C]">
            THE NEXTEDGE ECOSYSTEM
          </span>

          <h2 className="mt-6 text-4xl font-black text-[#0D1630] md:text-6xl">
            Two Journeys.
            <br />
            One Opportunity Network.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            Candidates discover opportunities while recruiters
            grow their network and earn rewards through successful
            subscriptions.
          </p>
        </div>

        {/* Journey Grid */}

        <div className="mt-24 grid gap-10 lg:grid-cols-2">
          {/* Candidate */}

          <div className="rounded-[40px] border border-[#6F925C]/15 bg-white p-10 shadow-sm">
            <div className="mb-8">
              <span className="text-sm font-semibold uppercase tracking-widest text-[#6F925C]">
                Candidate Journey
              </span>

              <h3 className="mt-3 text-3xl font-bold text-[#0D1630]">
                Build Your Career
              </h3>
            </div>

            <div className="space-y-5">
              {candidateFlow.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6F925C]/10">
                        <Icon
                          size={24}
                          className="text-[#6F925C]"
                        />
                      </div>

                      <div>
                        <h4 className="font-semibold text-[#0D1630]">
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    {index !== candidateFlow.length - 1 && (
                      <div className="ml-7 mt-3 h-8 w-[2px] bg-[#6F925C]/20" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Recruiter */}

          <div className="rounded-[40px] bg-[#0D1630] p-10 text-white">
            <div className="mb-8">
              <span className="text-sm font-semibold uppercase tracking-widest text-[#6F925C]">
                Recruiter Journey
              </span>

              <h3 className="mt-3 text-3xl font-bold">
                Earn While Helping Talent
              </h3>
            </div>

            <div className="space-y-5">
              {recruiterFlow.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                        <Icon size={24} />
                      </div>

                      <h4 className="font-semibold">
                        {item.title}
                      </h4>
                    </div>

                    {index !== recruiterFlow.length - 1 && (
                      <div className="ml-7 mt-3 h-8 w-[2px] bg-white/10" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Value Proposition */}

        <div className="mt-24 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="mx-auto max-w-4xl rounded-[40px] bg-white p-12 shadow-sm"
          >
            <ArrowDown
              className="mx-auto mb-6 text-[#6F925C]"
              size={40}
            />

            <h3 className="text-4xl font-black text-[#0D1630]">
              Candidate Pays ₹99
            </h3>

            <div className="my-8 h-px bg-gray-200" />

            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h4 className="text-xl font-bold text-[#0D1630]">
                  Candidate
                </h4>

                <p className="mt-2 text-gray-600">
                  Access verified opportunities.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-[#0D1630]">
                  Recruiter
                </h4>

                <p className="mt-2 text-gray-600">
                  Earn ₹9 commission.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-[#0D1630]">
                  Platform
                </h4>

                <p className="mt-2 text-gray-600">
                  Connect talent with employers.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}