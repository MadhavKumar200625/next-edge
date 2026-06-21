import {
  BriefcaseBusiness,
  CircleHelp,
  FileUser,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact NextEdge for help with your account, candidate profile, job discovery, applications, or general platform questions.",
};

const topics = [
  {
    icon: FileUser,
    title: "Profile support",
    description:
      "Questions about creating, completing, or updating your candidate profile.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Jobs and applications",
    description:
      "Help understanding opportunity details or navigating an application.",
  },
  {
    icon: ShieldCheck,
    title: "Account and access",
    description:
      "Assistance with sign-in, subscriptions, privacy, or account settings.",
  },
];

export default function ContactPage() {
  return (
    <>
     

      <section className="bg-white py-10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#6F925C]">
              How We Can Help
            </span>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#0D1630]">
              Start with the right context.
            </h2>
            <p className="mt-5 leading-7 text-gray-600">
              Choose the topic closest to your question and include any useful
              details. Please avoid sharing passwords or sensitive identity
              information.
            </p>

            <div className="mt-9 space-y-4">
              {topics.map((topic) => {
                const Icon = topic.icon;

                return (
                  <div
                    key={topic.title}
                    className="flex gap-4 rounded-[24px] border border-[#0D1630]/8 bg-[#F8FAF7] p-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#6F925C] shadow-sm">
                      <Icon size={21} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0D1630]">
                        {topic.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex gap-4 rounded-[24px] bg-[#0D1630] p-5 text-white">
              <CircleHelp
                size={22}
                className="mt-0.5 shrink-0 text-[#A9C29A]"
              />
              <div>
                <h3 className="font-bold">Not sure which topic to choose?</h3>
                <p className="mt-1 text-sm leading-6 text-white/60">
                  Select “General question” and describe what you need.
                </p>
              </div>
            </div>
          </aside>

          <ContactForm />
        
        {/* image9 placeholder */}
        <div className="col-span-full mt-6 image-slot" data-name="image9">image9</div>
        </div>
      </section>
    </>
  );
}
