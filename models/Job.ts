import mongoose, { Schema, Document, Types } from "mongoose";
import type { ApplicationStatus, Industry } from "@/types";

export interface IJob extends Document {
  userId: Types.ObjectId;
  position: string;
  company: string;
  industry: Industry;
  applicationStatus: ApplicationStatus;
  interviewDate?: string;
  appliedDate?: string;
  applicationLink?: string;
  notes?: string;
}

const JobSchema = new Schema<IJob>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    position: { type: String, required: true },
    company: { type: String, required: true },
    industry: { type: String, required: true },
    applicationStatus: { type: String, required: true, default: "Not applied" },
    interviewDate: { type: String, default: null },
    appliedDate: { type: String, default: null },
    applicationLink: { type: String, default: null },
    notes: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
