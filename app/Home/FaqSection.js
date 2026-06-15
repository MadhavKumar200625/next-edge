import Link from "next/link";
import { ArrowUpRight, HelpCircle, Plus } from "lucide-react";

const faqs = [
  {
    question: "What does the ₹99 candidate subscription include?",
    answer:
      "It activates access to the NextEdge opportunity network, allowing candidates to complete their profile and apply for relevant verified roles available on the platform.",
  },
  {
    question: "How are job opportunities verified?",
    answer:
      "Listings are reviewed before being presented as verified opportunities. Candidates should still review every role description and employer requirement before applying.",
  },
  {
    question: "How do I improve my chances of finding relevant roles?",
    answer:
      "Complete every section of your profile, keep your skills and experience current, and focus your applications on roles that closely match your background.",
  },
  {
    question: "Can I update my profile after registering?",
    answer:
      "Yes. You can keep your experience, skills, preferences, and other career details current as your professional journey develops.",
  },
  {
    question: "Does registering guarantee a job or interview?",
    answer:
      "No. NextEdge improves access to opportunities, but hiring decisions remain with employers and depend on role fit, qualifications, and interviews.",
  },
];

export default function FaqSection() {
  return (
    <section className="bg-white py-24 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6F925C]/10 text-[#6F925C]">
            <HelpCircle size={24} />
          </div>
          <span className="mt-7 block text-sm font-semibold uppercase tracking-[0.25em] text-[#6F925C]">
            Common Questions
          </span>
          <h2 className="mt-4 text-4xl font-black leading-tight text-[#0D1630] md:text-5xl">
            Everything to know before you begin.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-gray-600">
            Clear answers about candidate access, applications, and what to
            expect from the NextEdge platform.
          </p>

          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 font-bold text-[#0D1630]"
          >
            Ask another question
            <ArrowUpRight
              size={19}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="divide-y divide-[#0D1630]/10 border-y border-[#0D1630]/10">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group py-6" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-bold text-[#0D1630] marker:hidden">
                {faq.question}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F8FAF7] text-[#6F925C] transition-transform duration-300 group-open:rotate-45">
                  <Plus size={19} />
                </span>
              </summary>
              <p className="max-w-2xl pr-12 pt-4 leading-7 text-gray-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
