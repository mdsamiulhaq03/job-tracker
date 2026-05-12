import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JotionLogo } from "@/components/JotionLogo";
import { ArrowRight, Briefcase, LayoutDashboard, Filter, SlidersHorizontal } from "lucide-react";

const features = [
  { icon: LayoutDashboard, title: "Notion-style dashboard", description: "Clean interface with a custom cover photo and table layout you'll actually enjoy using." },
  { icon: Briefcase,       title: "Track every application", description: "Log position, company, industry, interview dates, links, and notes all in one place." },
  { icon: Filter,          title: "Filter & search", description: "Find entries by status — To Apply, Preparing Interview, Interviewed — or search any field." },
  { icon: SlidersHorizontal, title: "Inline editing", description: "Click any row to open a side panel. Edit and save without leaving the page." },
];

const statusBadges = [
  { label: "Not applied",          className: "bg-[#3a3a3a] text-[#9b9b9b] border-[#4a4a4a]" },
  { label: "Applied",              className: "bg-[#2e1f5e] text-[#a78bfa] border-[#4c3a8a]" },
  { label: "In progress",          className: "bg-[#3d2e00] text-[#f59e0b] border-[#5a4500]" },
  { label: "Preparing Interview",  className: "bg-[#3d1f00] text-[#f97316] border-[#5a3000]" },
  { label: "Interview ✓",          className: "bg-[#0d2d1a] text-[#22c55e] border-[#1a4a2e]" },
  { label: "Rejected",             className: "bg-[#2d0d0d] text-[#ef4444] border-[#4a1a1a]" },
];

const previewRows = [
  { position: "Software Engineer",  company: "Google",        industry: "Software & Technology",   status: "Rejected",             statusClass: "bg-[#2d0d0d] text-[#ef4444] border-[#4a1a1a]",   applied: "Mar 25, 2025" },
  { position: "Marketing Manager",  company: "Nike",          industry: "Retail & Consumer Commerce", status: "Not applied",        statusClass: "bg-[#3a3a3a] text-[#9b9b9b] border-[#4a4a4a]",   applied: "" },
  { position: "Financial Analyst",  company: "JPMorgan",      industry: "Financial Services & Banking", status: "In progress",      statusClass: "bg-[#3d2e00] text-[#f59e0b] border-[#5a4500]",   applied: "Mar 15, 2025" },
  { position: "Data Scientist",     company: "Amazon",        industry: "Data Engineering & Analytics", status: "Interview ✓",     statusClass: "bg-[#0d2d1a] text-[#22c55e] border-[#1a4a2e]",   applied: "Sep 25, 2024" },
  { position: "ML Engineer",        company: "Tesla",         industry: "Artificial Intelligence & Machine Learning", status: "Preparing Interview", statusClass: "bg-[#3d1f00] text-[#f97316] border-[#5a3000]", applied: "Jul 17, 2025" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-c-bg text-c-text flex flex-col">
      {/* Nav */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-c-border">
        <Link href="/">
          <JotionLogo iconSize={22} textSize="text-xl" />
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-c-t3 hover:text-c-text hover:bg-c-hover hidden sm:flex">
              Sign in
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="bg-c-text text-c-bg hover:bg-white hover:text-black font-medium">
              Get started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-c-border bg-c-surface text-xs text-c-t3 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          Free to use · No credit card required
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold text-c-text leading-tight max-w-2xl mb-5">
          Your job search,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
            organized
          </span>
        </h1>

        <p className="text-c-t3 text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
          Track every application, interview, and follow-up in a clean Notion-style workspace.
          Never lose track of where you stand.
        </p>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Link href="/register">
            <Button className="bg-c-text text-c-bg hover:bg-white hover:text-black font-medium gap-2 h-11 px-6">
              Start tracking <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" className="text-c-t3 hover:text-c-text hover:bg-c-hover h-11 px-6">
              Sign in
            </Button>
          </Link>
        </div>

        {/* Status badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-12">
          {statusBadges.map((b) => (
            <span key={b.label} className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${b.className}`}>
              {b.label}
            </span>
          ))}
        </div>

        {/* Mock table */}
        <div className="w-full max-w-4xl mt-8 rounded-xl border border-c-border bg-c-surface overflow-hidden text-left shadow-xl">
          <div className="flex items-center gap-1 px-4 py-3 border-b border-c-border overflow-x-auto">
            {["All", "To apply", "Preparing Interview", "Interviewed"].map((tab, i) => (
              <span key={tab} className={`px-2.5 py-1.5 rounded-md text-xs whitespace-nowrap ${i === 0 ? "bg-c-border text-c-text font-medium" : "text-c-t3"}`}>
                {tab}
              </span>
            ))}
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-xs min-w-[480px]">
              <thead>
                <tr className="border-b border-c-border">
                  {["Position", "Company", "Industry", "Status", "Applied"].map((col) => (
                    <th key={col} className="px-4 py-2 text-left text-c-t3 font-normal whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewRows.map((row) => (
                  <tr key={row.position} className="border-b border-c-border/50 hover:bg-c-hover transition-colors">
                    <td className="px-4 py-2.5 text-c-text font-medium whitespace-nowrap">{row.position}</td>
                    <td className="px-4 py-2.5 text-c-t2 whitespace-nowrap">{row.company}</td>
                    <td className="px-4 py-2.5 text-c-t2 whitespace-nowrap">{row.industry}</td>
                    <td className="px-4 py-2.5 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${row.statusClass}`}>{row.status}</span>
                    </td>
                    <td className="px-4 py-2.5 text-c-t2 whitespace-nowrap">{row.applied}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="px-4 sm:px-8 py-16 sm:py-20 border-t border-c-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-c-text text-center mb-10">Everything you need</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-5 rounded-lg border border-c-border bg-c-surface hover:border-c-t4 transition-colors">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-md bg-c-border">
                    <Icon className="w-4 h-4 text-c-t3" />
                  </div>
                  <h3 className="text-sm font-semibold text-c-text">{title}</h3>
                </div>
                <p className="text-sm text-c-t3 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-8 py-16 sm:py-20 border-t border-c-border text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-c-text mb-3">Ready to get organized?</h2>
        <p className="text-c-t3 mb-8">Create a free account and start tracking in seconds.</p>
        <Link href="/register">
          <Button className="bg-c-text text-c-bg hover:bg-white hover:text-black font-medium gap-2 h-11 px-8">
            Get started free <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>

      <footer className="px-4 sm:px-8 py-6 border-t border-c-border text-center text-xs text-c-t4">
        Jotion · Built with Next.js &amp; MongoDB
      </footer>
    </div>
  );
}
