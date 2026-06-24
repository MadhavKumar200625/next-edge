import React from "react";

export const metadata = {
  title: "About NextEdge-Talent",
  description: "About NextEdge-Talent - Right Guidance, Better Careers",
};

const leaders = [
  {
    name: "Mr. Nihal Anand – Founder & CEO",
    paragraphs: [
      "Mr. Nihal Anand leads NextEdge-Talent as the Founder & CEO, working towards helping professionals discover suitable career opportunities and supporting organizations with effective talent solutions.",
      "With a background in Computer Engineering and experience in recruitment consulting, business management, and talent acquisition, he focuses on helping candidates navigate their career paths while supporting organizations in finding suitable talent.",
      "His expertise includes career consulting, recruitment strategy, workforce solutions, leadership development, and business operations. Through NextEdge-Talent, he is committed to creating meaningful connections between talent and opportunity while promoting professional growth and career advancement.",
      "Driven by a people-first approach, Nihal works towards building a transparent, reliable, and growth-oriented recruitment ecosystem for both candidates and employers.",
    ],
  },
  {
    name: "Ms. Lavina Kapoor - Operations & Delivery Head",
    paragraphs: [
      "Ms. Lavina Kapoor supports the management of operational workflows and delivery processes at NextEdge-Talent, helping maintain a smooth experience for candidates and employers.",
      "With a strong focus on efficiency, organization, and service quality, she plays an important role in maintaining streamlined operations and delivering a professional experience for both candidates and employers.",
      "Her commitment to operational excellence helps ensure that recruitment and support processes remain structured, reliable, and candidate-focused.",
    ],
  },
  {
    name: "Ms. Anshu - HR & Admin",
    paragraphs: [
      "Ms. Anshu is the HR & Admin at NextEdge-Talent, contributing to recruitment coordination, talent acquisition support, and HR operations.",
      "With an interest in human resources and people management, she focuses on candidate communication, profile coordination, and maintaining smooth recruitment workflows.",
      "Her expertise includes recruitment support, candidate engagement, HR coordination, and process management, helping create an organized and efficient experience for both candidates and the team.",
    ],
  },
  {
    name: "Ms. Ranjani - Director – Skill Support & Guidance",
    paragraphs: [
      "Ms. Ranjani is the Director – Skill Support & Guidance at NextEdge-Talent, contributing to the organization’s growth through continuous support, guidance, and strategic involvement.",
      "She plays an important role in supporting business initiatives, encouraging skill development, and helping create a positive growth environment for candidates and the team.",
      "Her focus lies in providing guidance, strengthening processes, and supporting the vision of building better career opportunities through NextEdge-Talent.",
    ],
  },
  {
    name: "Ms. Damini Choudhary – Business Partner",
    paragraphs: [
      "Ms. Damini Choudhary serves as the Business Partner at NextEdge-Talent, supporting business development, strategic initiatives, and organizational growth.",
      "With a strong passion for learning and exploring new opportunities, she contributes to building meaningful relationships and supporting the company's mission of connecting talented professionals with the right career opportunities. Her interest in market trends, professional development, and business collaboration helps strengthen the organization's growth journey.",
      "Through her proactive approach and commitment to continuous improvement, Damini plays an important role in supporting business objectives while contributing to a positive and growth-focused environment for both candidates and employers.",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white px-6 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <section>
          <h1 className="text-4xl font-black leading-tight text-[#0D1630] md:text-6xl">
            About NextEdge-Talent
          </h1>
          <h2 className="mt-3 text-2xl font-bold text-gray-700">
            Right Guidance, Better Careers
          </h2>

          <div className="mt-7 max-w-3xl space-y-4 text-lg leading-8 text-gray-600">
            <p>
              NextEdge-Talent is a professional career consultancy platform
              focused on bridging the gap between jobseekers and employers
              across India.
            </p>

            <p>
              We provide structured recruitment support, career guidance, and
              placement assistance for students and freshers.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h3 className="text-3xl font-black text-[#0D1630]">
            Leadership Team
          </h3>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {leaders.map((leader,i) => (
              <article
                key={leader.name}
                className="flex flex-col gap-5 border border-[#0D1630]/10 bg-[#F8FAF7] p-6 sm:flex-row"
              >
                <div
  aria-hidden="true"
  className="mx-auto h-40 w-40 shrink-0 overflow-hidden rounded-full border-2 border-dashed border-[#6F925C]/35 bg-white shadow-sm sm:mx-0"
>
  <img
    src={`/leaders/${i + 1}.png`}
    alt={leader.name}
    className="h-full w-full object-cover"
  />
</div>
                <div>
                  <h4 className="text-xl font-black leading-snug text-[#0D1630]">
                    {leader.name}
                  </h4>
                  <div className="mt-3 space-y-3 leading-7 text-gray-600">
                    {leader.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="border-l-4 border-[#6F925C] pl-6">
            <h3 className="text-3xl font-black text-[#0D1630]">Our Vision</h3>
            <div className="mt-4 space-y-3 leading-7 text-gray-600">
              <p>
                To become a trusted career partner for students and job seekers
                by providing reliable guidance, transparent support, and
                meaningful career opportunities.
              </p>

              <p>
                NextEdge-Talent envisions building a platform where every
                individual can access the right career direction, discover
                genuine opportunities, and grow professionally with confidence.
                The vision is to create a transparent and supportive ecosystem
                that connects skilled talent with suitable employers while
                contributing to long-term career success across India.
              </p>
            </div>
          </div>

          <div className="border-l-4 border-[#6F925C] pl-6">
            <h3 className="text-3xl font-black text-[#0D1630]">Our Mission</h3>
            <div className="mt-4 space-y-3 leading-7 text-gray-600">
              <p>
                To help individuals achieve their career goals by connecting
                them with suitable opportunities and supporting their
                professional growth.
              </p>

              <p>
                NextEdge-Talent aims to build a transparent and reliable
                platform that connects talented professionals with the right
                employers. We focus on providing career guidance, recruitment
                support, and talent solutions that help individuals move forward
                in their careers while enabling organizations to discover
                suitable talent. Through our people-focused approach, we strive
                to create meaningful opportunities, strengthen professional
                connections, and contribute to long-term career success.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
