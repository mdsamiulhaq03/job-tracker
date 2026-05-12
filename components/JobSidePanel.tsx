"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { JobForm } from "@/components/JobForm";
import { StatusBadge } from "@/components/StatusBadge";
import { useToast } from "@/hooks/use-toast";
import type { Job } from "@/types";
import { INDUSTRY_ICONS } from "@/lib/industryIcons";
import { AlignLeft, Building2, Briefcase, Link2, Calendar, FileText, Trash2, Pencil } from "lucide-react";
import { format } from "date-fns";

interface JobSidePanelProps {
  job: Job | null;
  isNew: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (job: Job) => void;
  onDelete: (id: string) => void;
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return null;
  try { return format(new Date(dateStr), "MMMM d, yyyy"); } catch { return dateStr; }
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string | null }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-c-border">
      <div className="flex items-center gap-2 w-32 shrink-0">
        <Icon className="w-3.5 h-3.5 text-c-t3" />
        <span className="text-xs text-c-t3">{label}</span>
      </div>
      {value ? (
        label === "Application Link" ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-c-accent hover:underline truncate">
            {value}
          </a>
        ) : (
          <span className="text-sm text-c-text">{value}</span>
        )
      ) : (
        <span className="text-sm text-c-t4">Empty</span>
      )}
    </div>
  );
}

export function JobSidePanel({ job, isNew, open, onOpenChange, onSave, onDelete }: JobSidePanelProps) {
  const [isEditing, setIsEditing] = useState(isNew);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) setIsEditing(isNew);
  }, [open, isNew]);

  const handleSave = async (data: Partial<Job>) => {
    setIsLoading(true);
    try {
      const res = isNew
        ? await fetch("/api/jobs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        : await fetch(`/api/jobs/${job!._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      onSave(saved);
      setIsEditing(false);
      toast({ title: isNew ? "Entry created" : "Entry updated", description: `${data.position} at ${data.company}` });
    } catch {
      toast({ title: "Error", description: "Failed to save entry.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!job?._id) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/jobs/${job._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      onDelete(job._id);
      onOpenChange(false);
      toast({ title: "Entry deleted", description: `${job.position} at ${job.company}` });
    } catch {
      toast({ title: "Error", description: "Failed to delete entry.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const IndustryIcon = job ? (INDUSTRY_ICONS[job.industry] ?? AlignLeft) : AlignLeft;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-c-panel border-l border-c-border text-c-text p-0 overflow-y-auto"
      >
        <div className="p-5 sm:p-6">
          {isEditing ? (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <AlignLeft className="w-4 h-4 text-c-t3" />
                <h2 className="text-lg font-semibold text-c-text">{isNew ? "New Entry" : "Edit Entry"}</h2>
              </div>
              <JobForm
                job={job ?? undefined}
                onSubmit={handleSave}
                onCancel={() => { if (isNew) onOpenChange(false); else setIsEditing(false); }}
                isLoading={isLoading}
              />
            </div>
          ) : (
            job && (
              <div>
                <div className="flex items-start gap-2 mb-5">
                  <AlignLeft className="w-4 h-4 text-c-t3 mt-1 shrink-0" />
                  <h2 className="text-2xl font-bold text-c-text leading-tight">{job.position}</h2>
                </div>

                <div className="space-y-0 mb-6">
                  <div className="flex items-start gap-3 py-2.5 border-b border-c-border">
                    <div className="flex items-center gap-2 w-32 shrink-0">
                      <Briefcase className="w-3.5 h-3.5 text-c-t3" />
                      <span className="text-xs text-c-t3">Status</span>
                    </div>
                    <StatusBadge status={job.applicationStatus} />
                  </div>
                  <InfoRow icon={Building2} label="Company" value={job.company} />
                  <InfoRow icon={IndustryIcon} label="Industry" value={job.industry} />
                  <InfoRow icon={Link2} label="Application Link" value={job.applicationLink} />
                  <InfoRow icon={Calendar} label="Interview Date" value={formatDate(job.interviewDate)} />
                  <InfoRow icon={Calendar} label="Applied" value={formatDate(job.appliedDate)} />
                  <InfoRow icon={FileText} label="Notes" value={job.notes} />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 bg-c-text text-c-bg hover:bg-white hover:text-black gap-2"
                    size="sm"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </Button>
                  <Button
                    onClick={handleDelete}
                    disabled={isLoading}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10 gap-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
