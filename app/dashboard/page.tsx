"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CoverPhoto } from "@/components/CoverPhoto";
import { JobTable } from "@/components/JobTable";
import { JobSidePanel } from "@/components/JobSidePanel";
import { Button } from "@/components/ui/button";
import { JotionLogo } from "@/components/JotionLogo";
import type { Job } from "@/types";
import type { FilterTab } from "@/components/JobTable";
import { Plus, LogOut } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isNewJob, setIsNewJob] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/jobs");
      if (!res.ok) throw new Error("Failed to fetch");
      setJobs(await res.json());
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCover = useCallback(async () => {
    try {
      const res = await fetch("/api/user/cover");
      if (!res.ok) return;
      const { coverImage } = await res.json();
      setCoverImage(coverImage);
    } catch {}
  }, []);

  useEffect(() => {
    if (status === "authenticated") { fetchJobs(); fetchCover(); }
  }, [status, fetchJobs, fetchCover]);

  const handleRowClick = (job: Job) => { setSelectedJob(job); setIsNewJob(false); setPanelOpen(true); };
  const handleNewEntry = () => { setSelectedJob(null); setIsNewJob(true); setPanelOpen(true); };
  const handleSave = (saved: Job) => {
    setJobs((prev) => {
      const idx = prev.findIndex((j) => j._id === saved._id);
      if (idx >= 0) { const u = [...prev]; u[idx] = saved; return u; }
      return [saved, ...prev];
    });
    setSelectedJob(saved);
    setIsNewJob(false);
  };
  const handleDelete = (id: string) => { setJobs((prev) => prev.filter((j) => j._id !== id)); setSelectedJob(null); setPanelOpen(false); };

  if (status === "unauthenticated") return null;

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-c-bg flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-c-text border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-c-bg">
      <CoverPhoto coverImage={coverImage} onCoverChange={setCoverImage} />

      {/* Header */}
      <div className="px-4 sm:px-8 pt-5 pb-2 flex flex-wrap items-center gap-3 justify-between">
        <JotionLogo iconSize={22} textSize="text-xl" />
        <div className="flex items-center gap-2">
          <Button
            onClick={handleNewEntry}
            size="sm"
            className="bg-c-text text-c-bg hover:bg-white hover:text-black gap-1.5 h-8 text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">New Entry</span>
            <span className="xs:hidden">New</span>
          </Button>
          <Button
            onClick={() => signOut({ callbackUrl: "/" })}
            size="sm"
            variant="ghost"
            className="text-c-t3 hover:text-c-text hover:bg-c-hover gap-1.5 h-8 text-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="mx-2 sm:mx-4 mt-4 rounded-lg border border-c-border bg-c-surface overflow-hidden">
        <JobTable
          jobs={jobs}
          isLoading={isLoading}
          onRowClick={handleRowClick}
          selectedJobId={selectedJob?._id}
          searchQuery={searchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onSearchChange={setSearchQuery}
        />
      </div>

      <JobSidePanel
        job={selectedJob}
        isNew={isNewJob}
        open={panelOpen}
        onOpenChange={setPanelOpen}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
