"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  ArrowRight,
} from "lucide-react";

const jobs = [
  {
    title: "Software Engineer",
    company: "TCS",
    location: "Bangalore",
    salary: "8 - 12 LPA",
    type: "Full Time",
  },
  {
    title: "Frontend Developer",
    company: "Infosys",
    location: "Pune",
    salary: "6 - 10 LPA",
    type: "Hybrid",
  },
  {
    title: "Data Analyst",
    company: "Wipro",
    location: "Remote",
    salary: "7 - 11 LPA",
    type: "Remote",
  },
];
export default function FeaturedJobs() {
  return (
    <section className="bg-[#F9FAFB] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#6F925C]">
            Featured Jobs
          </span>

          <h2 className="mt-4 text-4xl font-extrabold text-[#0D1630] md:text-5xl">
            Opportunities Worth Exploring
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Discover handpicked opportunities from
            trusted recruiters and growing companies.
          </p>
        </div>

        {/* Jobs */}

        <div className="grid gap-8 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <motion.div
              key={job.title}
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
              transition={{
                delay: index * 0.15,
              }}
              className="group rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#6F925C]/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              {/* Badge */}

              <div className="mb-6 inline-flex rounded-full bg-[#6F925C]/10 px-4 py-2 text-sm font-semibold text-[#6F925C]">
                Featured
              </div>

              {/* Title */}

              <h3 className="text-2xl font-bold text-[#0D1630]">
                {job.title}
              </h3>

              <p className="mt-2 text-gray-500">
                {job.company}
              </p>

              {/* Meta */}

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin size={18} />
                  {job.location}
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <BriefcaseBusiness size={18} />
                  {job.type}
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <IndianRupee size={18} />
                  {job.salary}
                </div>
              </div>

              {/* CTA */}

              <button className="group mt-10 flex items-center gap-2 font-semibold text-[#0D1630]">
                View Details

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}

        <div className="mt-16 text-center">
          <button className="rounded-full bg-[#0D1630] px-8 py-4 font-semibold text-white transition hover:bg-[#16213F]">
            Explore All Jobs
          </button>
        </div>
      </div>
    </section>
  );
}