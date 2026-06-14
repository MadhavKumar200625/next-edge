"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Users,
  BadgeIndianRupee,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAFA]">
      {/* BACKGROUND BLOBS */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#6F925C]/10 blur-[140px]" />
        <div className="absolute right-0 top-20 h-[400px] w-[400px] rounded-full bg-[#0D1630]/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center gap-16 px-6 py-10 lg:flex-row lg:py-10">
        {/* LEFT */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#6F925C]/30 bg-[#6F925C]/10 px-4 py-2 text-sm font-medium text-[#6F925C]"
          >
            <CheckCircle2 size={16} />
            Trusted by Recruiters & Career Professionals
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl font-extrabold leading-tight text-[#0D1630] md:text-6xl"
          >
            Accelerate Your Career
            <span className="block text-[#6F925C]">
              With Verified Opportunities
            </span>
            And Expert Recruiters
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600"
          >
            Connect with trusted recruiters, explore verified job
            opportunities, and take the next step in your professional
            journey with confidence.
          </motion.p>

          {/* TRUST POINTS */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 space-y-3"
          >
            {[
              "Verified Recruiters",
              "Premium Job Opportunities",
              "Fast Application Process",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-[#0D1630]"
              >
                <CheckCircle2
                  size={18}
                  className="text-[#6F925C]"
                />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button className="group inline-flex items-center gap-2 rounded-xl bg-[#6F925C] px-7 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#5F7D4F]">
              Explore Jobs
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </button>

            <button className="rounded-xl border border-[#0D1630] px-7 py-4 font-semibold text-[#0D1630] transition-all duration-300 hover:bg-[#0D1630] hover:text-white">
              Become an HR Partner
            </button>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="relative flex w-full items-center justify-center lg:w-1/2">
          <div className="relative h-[550px] w-full max-w-[520px]">
            {/* CARD 1 */}
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="absolute left-0 top-10 w-[280px] rounded-3xl border border-white bg-white/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#6F925C]/10">
                <BriefcaseBusiness className="text-[#6F925C]" />
              </div>

              <h3 className="font-bold text-[#0D1630]">
                Software Engineer
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Full Time • Remote
              </p>

              <div className="mt-4 inline-block rounded-full bg-[#6F925C]/10 px-3 py-1 text-sm font-semibold text-[#6F925C]">
                ₹8 - ₹12 LPA
              </div>
            </motion.div>

            {/* CARD 2 */}
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
              }}
              className="absolute right-0 top-0 w-[220px] rounded-3xl bg-[#0D1630] p-6 text-white shadow-[0_20px_50px_rgba(13,22,48,0.3)]"
            >
              <Users className="mb-4 text-[#6F925C]" />

              <h3 className="text-4xl font-bold">1500+</h3>

              <p className="mt-2 text-sm text-white/70">
                Active Opportunities
              </p>
            </motion.div>

            {/* CARD 3 */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 7,
              }}
              className="absolute bottom-20 left-10 w-[220px] rounded-3xl bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            >
              <Users className="mb-4 text-[#6F925C]" />

              <h3 className="text-4xl font-bold text-[#0D1630]">
                500+
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Recruitment Partners
              </p>
            </motion.div>

            {/* CARD 4 */}
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5.5,
              }}
              className="absolute bottom-0 right-0 w-[240px] rounded-3xl bg-[#6F925C] p-6 text-white shadow-[0_20px_50px_rgba(111,146,92,0.35)]"
            >
              <BadgeIndianRupee className="mb-4" />

              <h3 className="text-4xl font-bold">₹9</h3>

              <p className="mt-2 text-sm text-white/80">
                Commission Per Subscription
              </p>
            </motion.div>

            {/* CENTER GLOW */}
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6F925C]/10 blur-[100px]" />
          </div>
        </div>
      </div>
    </section>
  );
}