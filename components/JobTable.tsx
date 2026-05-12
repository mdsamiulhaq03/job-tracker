"use client";

import { StatusBadge } from "@/components/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Job, ApplicationStatus } from "@/types";
import { INDUSTRY_ICONS } from "@/lib/industryIcons";
import { format } from "date-fns";
import { AlignLeft, Building2, Briefcase, Link2, Calendar, FileText, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const FILTER_TABS = [
  { label: "All",           icon: "≡", value: "all" },
  { label: "To apply",      icon: "✏", value: "to-apply" },
  { label: "Preparing",     icon: "●", value: "preparing" },
  { label: "Interviewed",   icon: "✓", value: "interviewed" },
] as const;

type FilterTab = (typeof FILTER_TABS)[number]["value"];

const TAB_STATUSES: Record<FilterTab, ApplicationStatus[]> = {
  all:          [],
  "to-apply":   ["Not applied"],
  preparing:    ["Preparing Interview"],
  interviewed:  ["Interview"],
};

function formatDate(dateStr?: string | null) {
  if (!dateStr) return "";
  try { return format(new Date(dateStr), "MMM d, yyyy"); } catch { return dateStr; }
}

interface JobTableProps {
  jobs: Job[];
  isLoading: boolean;
  onRowClick: (job: Job) => void;
  selectedJobId?: string;
  searchQuery: string;
  activeFilter: FilterTab;
  onFilterChange: (filter: FilterTab) => void;
  onSearchChange: (q: string) => void;
}

const COLUMNS = [
  { icon: AlignLeft, label: "Position" },
  { icon: Building2, label: "Company" },
  { icon: AlignLeft, label: "Industry" },
  { icon: Briefcase, label: "Status" },
  { icon: Calendar,  label: "Applied" },
  { icon: Calendar,  label: "Interview Date" },
  { icon: Link2,     label: "Link" },
  { icon: FileText,  label: "Notes" },
];

export function JobTable({
  jobs, isLoading, onRowClick, selectedJobId,
  searchQuery, activeFilter, onFilterChange, onSearchChange,
}: JobTableProps) {
  const filtered = jobs.filter((job) => {
    const statusFilter = TAB_STATUSES[activeFilter];
    if (statusFilter.length > 0 && !statusFilter.includes(job.applicationStatus)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        (job.position?.toLowerCase() ?? "").includes(q) ||
        (job.company?.toLowerCase() ?? "").includes(q) ||
        (job.industry?.toLowerCase() ?? "").includes(q) ||
        (job.applicationStatus?.toLowerCase() ?? "").includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 border-b border-c-border gap-2">
        <div className="flex items-center gap-0.5 overflow-x-auto flex-nowrap">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onFilterChange(tab.value)}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs whitespace-nowrap transition-colors shrink-0",
                activeFilter === tab.value
                  ? "bg-c-border text-c-text font-medium"
                  : "text-c-t3 hover:text-c-text hover:bg-c-hover"
              )}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-c-t4 shrink-0">
          <Search className="w-3.5 h-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-c-t3 text-xs w-24 sm:w-36 placeholder:text-c-t4 focus:text-c-text"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-c-border">
              {COLUMNS.map(({ icon: Icon, label }) => (
                <th key={label} className="px-3 sm:px-4 py-2 text-left text-xs text-c-t3 font-normal whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3 h-3" />
                    {label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-c-border/50">
                  {COLUMNS.map((col) => (
                    <td key={col.label} className="px-3 sm:px-4 py-3">
                      <Skeleton className="h-4 w-20 bg-c-border" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-4 py-16 text-center text-c-t4 text-sm">
                  {searchQuery || activeFilter !== "all"
                    ? "No entries match your filters."
                    : 'No entries yet. Click "New Entry" to get started.'}
                </td>
              </tr>
            ) : (
              filtered.map((job) => {
                const IndustryIcon = INDUSTRY_ICONS[job.industry] ?? null;
                return (
                  <tr
                    key={job._id}
                    onClick={() => onRowClick(job)}
                    className={cn(
                      "border-b border-c-border/50 cursor-pointer transition-colors",
                      selectedJobId === job._id
                        ? "bg-c-selected border-l-2 border-l-c-accent"
                        : "hover:bg-c-hover"
                    )}
                  >
                    <td className="px-3 sm:px-4 py-2.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <AlignLeft className="w-3 h-3 text-c-t4 shrink-0" />
                        <span className="text-c-text font-medium">{job.position}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 text-c-t2 whitespace-nowrap">{job.company}</td>
                    <td className="px-3 sm:px-4 py-2.5 text-c-t2 whitespace-nowrap">
                      <span className="flex items-center gap-1.5">
                        {IndustryIcon && <IndustryIcon className="w-3 h-3 text-c-t3 shrink-0" />}
                        {job.industry}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 whitespace-nowrap">
                      <StatusBadge status={job.applicationStatus} />
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 text-c-t2 whitespace-nowrap">{formatDate(job.appliedDate)}</td>
                    <td className="px-3 sm:px-4 py-2.5 text-c-t2 whitespace-nowrap">{formatDate(job.interviewDate)}</td>
                    <td className="px-3 sm:px-4 py-2.5">
                      {job.applicationLink && (
                        <a
                          href={job.applicationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-c-accent hover:underline text-xs"
                        >
                          Link
                        </a>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 text-c-t3 max-w-[160px]">
                      <span
                        className="truncate block text-xs"
                        title={job.notes ?? undefined}
                      >
                        {job.notes}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export type { FilterTab };
