"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Find Jobs",
      href: "/jobs",
    },
    {
      label: "How It Works",
      href: "/#how-it-works",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Success Stories",
      href: "/success-stories",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center"
            >
              <Image
                src="/logo.png"
                alt="NextEdge"
                width={180}
                height={70}
                className="h-14 w-auto object-contain"
                priority
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative font-medium text-[#0D1630]"
                >
                  {item.label}

                  <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#6F925C] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* RIGHT */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href="/login"
                className="font-semibold text-[#0D1630] hover:text-[#6F925C] transition"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-full bg-[#0D1630] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#152247] hover:shadow-lg"
              >
                Get Started

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() =>
                setMobileOpen(!mobileOpen)
              }
              className="lg:hidden"
            >
              {mobileOpen ? (
                <X
                  size={28}
                  className="text-[#0D1630]"
                />
              ) : (
                <Menu
                  size={28}
                  className="text-[#0D1630]"
                />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`overflow-hidden bg-white transition-all duration-300 lg:hidden ${
            mobileOpen
              ? "max-h-[600px] border-t"
              : "max-h-0"
          }`}
        >
          <div className="space-y-6 px-6 py-8">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() =>
                  setMobileOpen(false)
                }
                className="block text-lg font-medium text-[#0D1630]"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 border-t">
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="rounded-xl border border-gray-200 px-5 py-3 text-center font-semibold text-[#0D1630]"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-[#0D1630] px-5 py-3 text-center font-semibold text-white"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-24" />
    </>
  );
}
