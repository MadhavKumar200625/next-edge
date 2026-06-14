import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Code2,
  Headphones,
  Landmark,
  Megaphone,
  Palette,
  Stethoscope,
} from "lucide-react";

const categories = [
  {
    name: "Technology",
    roles: "420+ open roles",
    icon: Code2,
  },
  {
    name: "Sales & Marketing",
    roles: "310+ open roles",
    icon: Megaphone,
  },
  {
    name: "Finance & Banking",
    roles: "185+ open roles",
    icon: Landmark,
  },
  {
    name: "Data & Analytics",
    roles: "240+ open roles",
    icon: BarChart3,
  },
  {
    name: "Design & Creative",
    roles: "130+ open roles",
    icon: Palette,
  },
  {
    name: "Healthcare",
    roles: "165+ open roles",
    icon: Stethoscope,
  },
  {
    name: "Customer Support",
    roles: "205+ open roles",
    icon: Headphones,
  },
  {
    name: "Operations",
    roles: "145+ open roles",
    icon: BriefcaseBusiness,
  },
];

export default function JobCategories() {
  return (
    <section className="bg-[#F8FAF7] py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#6F925C]">
              Explore By Category
            </span>
            <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight text-[#0D1630] md:text-5xl">
              Find the field where your next move belongs.
            </h2>
          </div>

          <p className="max-w-md text-lg leading-8 text-gray-600">
            Browse opportunities by expertise and discover roles aligned with
            the skills you want to grow.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={{
                  pathname: "/jobs",
                  query: { category: category.name },
                }}
                className="group rounded-[28px] border border-[#0D1630]/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#6F925C]/30 hover:shadow-[0_18px_45px_rgba(13,22,48,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6F925C]/10 text-[#6F925C] transition-colors group-hover:bg-[#6F925C] group-hover:text-white">
                    <Icon size={23} />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-[#0D1630]/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#6F925C]"
                  />
                </div>

                <h3 className="mt-7 text-lg font-bold text-[#0D1630]">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{category.roles}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
