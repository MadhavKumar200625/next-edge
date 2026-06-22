import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "NextEdge Talant Consultancy | Verified Jobs & Career Opportunities",
    template: "%s | NextEdge Talant Consultancy Talant Consultancy",
  },
  description:
    "Discover verified job opportunities, build your professional profile, and take the next step in your career with NextEdge Talant Consultancy.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header></Header>
        <main className="flex-1">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
