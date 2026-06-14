"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "12,500+",
    label: "Candidates Registered",
  },
  {
    number: "1,800+",
    label: "Active Jobs",
  },
  {
    number: "350+",
    label: "Hiring Partners",
  },
  {
    number: "₹2.4L+",
    label: "Commissions Paid",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-20 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#6F925C]">
            TRUSTED PLATFORM
          </span>

          <h2 className="mt-4 text-4xl font-extrabold text-[#0D1630] md:text-5xl">
            Numbers That Matter
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Connecting talented professionals with
            verified recruiters while creating earning
            opportunities for HR partners.
          </p>
        </motion.div>

        {/* Stats */}

        <div className="grid gap-y-16 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              className="text-center"
            >
              <h3 className="text-5xl font-black text-[#0D1630] lg:text-6xl">
                {item.number}
              </h3>

              <div className="mx-auto my-4 h-1 w-12 rounded-full bg-[#6F925C]" />

              <p className="text-base font-medium text-gray-600">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}