"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { APPLICATION_STATUSES, INDUSTRY_GROUPS } from "@/types";
import { INDUSTRY_ICONS } from "@/lib/industryIcons";
import type { Job } from "@/types";

interface JobFormProps {
  job?: Partial<Job>;
  onSubmit: (data: Partial<Job>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function JobForm({ job, onSubmit, onCancel, isLoading }: JobFormProps) {
  const [formData, setFormData] = useState<Partial<Job>>({
    position:          job?.position          ?? "",
    company:           job?.company           ?? "",
    industry:          job?.industry          ?? "Software & Technology",
    applicationStatus: job?.applicationStatus ?? "Not applied",
    interviewDate:     job?.interviewDate     ?? "",
    appliedDate:       job?.appliedDate       ?? "",
    applicationLink:   job?.applicationLink   ?? "",
    notes:             job?.notes             ?? "",
  });

  const field = (key: keyof Job, value: string) => setFormData((p) => ({ ...p, [key]: value }));

  const fieldClass = "bg-c-input border-c-border text-c-text placeholder:text-c-t4 focus:border-c-t3 focus-visible:ring-0 focus-visible:ring-offset-0";

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-4">
      <div className="space-y-1.5">
        <Label className="text-c-t3 text-xs">Position</Label>
        <Input required value={formData.position} onChange={(e) => field("position", e.target.value)} placeholder="e.g. Software Engineer" className={fieldClass} />
      </div>

      <div className="space-y-1.5">
        <Label className="text-c-t3 text-xs">Company</Label>
        <Input required value={formData.company} onChange={(e) => field("company", e.target.value)} placeholder="e.g. Google" className={fieldClass} />
      </div>

      <div className="space-y-1.5">
        <Label className="text-c-t3 text-xs">Industry</Label>
        <Select value={formData.industry} onValueChange={(v) => field("industry", v)}>
          <SelectTrigger className={fieldClass}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-c-panel border-c-border text-c-text max-h-72">
            {INDUSTRY_GROUPS.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel className="text-c-t4 text-[10px] tracking-widest px-2 py-1.5">{group.label}</SelectLabel>
                {group.items.map((ind) => {
                  const Icon = INDUSTRY_ICONS[ind];
                  return (
                    <SelectItem key={ind} value={ind} className="focus:bg-c-hover focus:text-c-text pl-4">
                      <span className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-c-t3 shrink-0" />
                        {ind}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-c-t3 text-xs">Application Status</Label>
        <Select value={formData.applicationStatus} onValueChange={(v) => field("applicationStatus", v)}>
          <SelectTrigger className={fieldClass}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-c-panel border-c-border text-c-text">
            {APPLICATION_STATUSES.map((s) => (
              <SelectItem key={s} value={s} className="focus:bg-c-hover focus:text-c-text">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-c-t3 text-xs">Applied Date</Label>
          <Input type="date" value={formData.appliedDate ?? ""} onChange={(e) => field("appliedDate", e.target.value)} className={fieldClass} style={{ colorScheme: "dark" }} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-c-t3 text-xs">Interview Date</Label>
          <Input type="date" value={formData.interviewDate ?? ""} onChange={(e) => field("interviewDate", e.target.value)} className={fieldClass} style={{ colorScheme: "dark" }} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-c-t3 text-xs">Application Link</Label>
        <Input type="url" value={formData.applicationLink ?? ""} onChange={(e) => field("applicationLink", e.target.value)} placeholder="https://..." className={fieldClass} />
      </div>

      <div className="space-y-1.5">
        <Label className="text-c-t3 text-xs">Notes</Label>
        <Textarea value={formData.notes ?? ""} onChange={(e) => field("notes", e.target.value)} placeholder="Add any notes..." rows={3} className={`${fieldClass} resize-none`} />
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={isLoading} className="flex-1 bg-c-text text-c-bg hover:bg-white hover:text-black">
          {isLoading ? "Saving..." : job?._id ? "Save Changes" : "Add Entry"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel} className="text-c-t3 hover:text-c-text hover:bg-c-hover">
          Cancel
        </Button>
      </div>
    </form>
  );
}
