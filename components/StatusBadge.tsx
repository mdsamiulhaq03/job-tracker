import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/types";

const statusConfig: Record<ApplicationStatus, { label: string; className: string }> = {
  "Not applied": {
    label: "Not applied",
    className: "bg-[#3a3a3a] text-[#9b9b9b] border-[#4a4a4a]",
  },
  Applied: {
    label: "Applied",
    className: "bg-[#2e1f5e] text-[#a78bfa] border-[#4c3a8a]",
  },
  "In progress": {
    label: "In progress",
    className: "bg-[#3d2e00] text-[#f59e0b] border-[#5a4500]",
  },
  "Preparing Interview": {
    label: "Preparing Interview",
    className: "bg-[#3d1f00] text-[#f97316] border-[#5a3000]",
  },
  Interview: {
    label: "Interview ✓",
    className: "bg-[#0d2d1a] text-[#22c55e] border-[#1a4a2e]",
  },
  Rejected: {
    label: "Rejected",
    className: "bg-[#2d0d0d] text-[#ef4444] border-[#4a1a1a]",
  },
};

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? statusConfig["Not applied"];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
