import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export const metadata = {
  title: "Terms & Conditions | NextEdge Talent Consultancy",
  description:
    "Terms and Conditions governing the use of the NextEdge Talent Consultancy platform.",
};

export default function TermsPage() {
  const filePath = path.join(
    process.cwd(),
    "app",
    "terms",
    "terms.md"
  );

  const content = fs.readFileSync(filePath, "utf8");

  return (
  <main className="min-h-screen bg-[#FAFAFA]">
    {/* Progress Bar */}
    <div className="sticky top-0 z-50 h-1 w-full bg-slate-200">
      <div className="h-full w-full bg-gradient-to-r from-[#6F925C] to-[#0D1630]" />
    </div>

    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-48 left-0 h-[420px] w-[420px] rounded-full bg-[#6F925C]/10 blur-3xl opacity-70" />
        <div className="absolute right-0 top-32 h-[500px] w-[500px] rounded-full bg-[#0D1630]/10 blur-3xl opacity-60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <span className="rounded-full border border-[#6F925C]/30 bg-[#6F925C]/10 px-5 py-2 text-sm font-semibold text-[#6F925C]">
            Legal Information
          </span>

          <h1 className="mt-8 text-5xl font-black tracking-tight text-[#0D1630] md:text-6xl">
            Terms & Conditions
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Please read these Terms and Conditions carefully before using the
            NextEdge Talent Consultancy platform. By accessing or using our
            services, you acknowledge and agree to these terms.
          </p>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_80px_rgba(13,22,48,0.08)]">
        {/* Header */}
        <div className="border-b bg-[#FAFAFA] px-10 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#0D1630]">
                NextEdge Talent Consultancy
              </h2>

              <p className="mt-2 text-gray-500">
                Recruitment Platform • Legal Documentation
              </p>
            </div>

            <div className="rounded-2xl border border-[#6F925C]/20 bg-white px-6 py-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Document
              </p>

              <p className="mt-1 font-semibold text-[#0D1630]">
                Terms & Conditions
              </p>
            </div>
          </div>
        </div>

        {/* Markdown */}
        <article
          className="
          prose
          prose-slate
          max-w-none

          p-8
          md:p-14
          lg:p-16

          prose-headings:scroll-mt-32
          prose-headings:font-bold
          prose-headings:text-[#0D1630]

          prose-h1:text-5xl

          prose-h2:mt-16
          prose-h2:mb-6
          prose-h2:border-b
          prose-h2:border-[#6F925C]/20
          prose-h2:pb-3
          prose-h2:text-3xl

          prose-h3:text-2xl
          prose-h3:text-[#0D1630]

          prose-p:leading-8
          prose-p:text-gray-700

          prose-li:leading-8
          prose-li:text-gray-700
          prose-li:marker:text-[#6F925C]

          prose-strong:text-[#0D1630]

          prose-a:text-[#6F925C]
          prose-a:no-underline
          hover:prose-a:underline

          prose-blockquote:border-l-4
          prose-blockquote:border-[#6F925C]
          prose-blockquote:bg-[#6F925C]/5
          prose-blockquote:rounded-r-xl
          prose-blockquote:px-5
          prose-blockquote:py-3

          prose-table:border
          prose-table:border-slate-300

          prose-th:border
          prose-th:bg-[#FAFAFA]
          prose-th:p-3

          prose-td:border
          prose-td:p-3

          prose-code:rounded
          prose-code:bg-[#6F925C]/10
          prose-code:px-2
          prose-code:py-1
          prose-code:text-[#6F925C]

          selection:bg-[#6F925C]/20
        "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ]}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>

      {/* Footer */}
      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
        © {new Date().getFullYear()} NextEdge Talent Consultancy. All rights
        reserved.
      </div>
    </section>
  </main>
);
}