"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Quote,
  Sparkles,
  Users,
} from "lucide-react";

const stories = [
  {
    initials: "AS",
    name: "Ananya Sharma",
    role: "Frontend Developer",
    location: "Bengaluru",
    quote:
      "The opportunities felt relevant from day one. I connected with a verified recruiter, interviewed with confidence, and found a role that matched the direction I wanted for my career.",
    result: "Hired in 21 days",
    tone: "light",
  },
  {
    initials: "RM",
    name: "Rahul Mehta",
    role: "Independent HR Partner",
    location: "Pune",
    quote:
      "NextEdge gives me a simple way to help candidates in my network while building a dependable additional income stream.",
    result: "86 successful referrals",
    tone: "green",
  },
  {
    initials: "PN",
    name: "Priya Nair",
    role: "Data Analyst",
    location: "Kochi",
    quote:
      "Verified listings saved me from wasting time. My profile reached the right teams, and I received three interview calls in my first week.",
    result: "3 interview calls",
    tone: "navy",
  },
];

const cardStyles = {
  light: {
    card: "border border-[#0D1630]/10 bg-white text-[#0D1630]",
    icon: "bg-[#6F925C]/10 text-[#6F925C]",
    avatar: "bg-[#0D1630] text-white",
    muted: "text-gray-500",
    result: "bg-[#6F925C]/10 text-[#5F7D4F]",
  },
  green: {
    card: "bg-[#6F925C] text-white",
    icon: "bg-white/15 text-white",
    avatar: "bg-white text-[#5F7D4F]",
    muted: "text-white/70",
    result: "bg-white/15 text-white",
  },
  navy: {
    card: "bg-[#0D1630] text-white",
    icon: "bg-white/10 text-[#A9C29A]",
    avatar: "bg-[#6F925C] text-white",
    muted: "text-white/65",
    result: "bg-white/10 text-white",
  },
};

export default function SuccessStories() {
  return (
    <section
      id="success-stories"
      className="relative overflow-hidden bg-white py-24 md:py-28"
    >
      <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#6F925C]/10 blur-[110px]" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#0D1630]/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#6F925C]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#5F7D4F]">
              <Sparkles size={16} />
              Success Stories
            </div>

            <h2 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-[#0D1630] md:text-6xl">
              Career moves that
              <span className="text-[#6F925C]"> changed the next chapter.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="lg:pb-2"
          >
            <p className="text-lg leading-8 text-gray-600">
              See how candidates and HR partners are using one trusted
              network to find better opportunities, make meaningful
              connections, and grow together.
            </p>

            <Link
              href="/success-stories"
              className="group mt-6 inline-flex items-center gap-2 font-bold text-[#0D1630]"
            >
              Explore all stories
              <ArrowUpRight
                size={19}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {stories.map((story, index) => {
            const styles = cardStyles[story.tone];

            return (
              <motion.article
                key={story.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.12, duration: 0.55 }}
                className={`group flex min-h-[410px] flex-col rounded-[36px] p-8 shadow-[0_18px_60px_rgba(13,22,48,0.08)] transition-transform duration-300 hover:-translate-y-2 md:p-10 ${
                  index === 0 ? "lg:col-span-6" : "lg:col-span-3"
                } ${styles.card}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${styles.icon}`}
                  >
                    <Quote size={24} />
                  </div>

                  <div
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold ${styles.result}`}
                  >
                    <BadgeCheck size={16} />
                    {story.result}
                  </div>
                </div>

                <blockquote
                  className={`mt-10 font-semibold leading-relaxed ${
                    index === 0 ? "text-2xl md:text-3xl" : "text-xl"
                  }`}
                >
                  “{story.quote}”
                </blockquote>

                <div className="mt-auto flex items-center gap-4 pt-10">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-black ${styles.avatar}`}
                  >
                    {story.initials}
                  </div>

                  <div>
                    <h3 className="font-bold">{story.name}</h3>
                    <p className={`mt-1 text-sm ${styles.muted}`}>
                      {story.role} · {story.location}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="mt-6 grid gap-6 rounded-[32px] border border-[#0D1630]/10 bg-[#F8FAF7] p-7 sm:grid-cols-2 md:p-9"
        >
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#6F925C] shadow-sm">
              <BriefcaseBusiness size={25} />
            </div>
            <div>
              <p className="text-2xl font-black text-[#0D1630]">1,800+</p>
              <p className="mt-1 text-sm text-gray-600">
                active roles ready to explore
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 sm:border-l sm:border-[#0D1630]/10 sm:pl-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#6F925C] shadow-sm">
              <Users size={25} />
            </div>
            <div>
              <p className="text-2xl font-black text-[#0D1630]">350+</p>
              <p className="mt-1 text-sm text-gray-600">
                trusted hiring partners in the network
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
