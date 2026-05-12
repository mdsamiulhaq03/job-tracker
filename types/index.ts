export type ApplicationStatus =
  | "Not applied"
  | "Applied"
  | "In progress"
  | "Preparing Interview"
  | "Interview"
  | "Rejected";

export type Industry =
  | "Software & Technology"
  | "Artificial Intelligence & Machine Learning"
  | "Cybersecurity & Information Security"
  | "Cloud Computing & DevOps"
  | "Data Engineering & Analytics"
  | "Web & Mobile Development"
  | "Embedded Systems & IoT"
  | "Game Development & XR"
  | "Blockchain & Web3"
  | "Robotics & Automation"
  | "Retail & Consumer Commerce"
  | "Healthcare & Life Sciences"
  | "Financial Services & Banking"
  | "Engineering & Manufacturing"
  | "Media & Digital Entertainment"
  | "Infrastructure & Real Estate"
  | "Consumer Goods & FMCG"
  | "Pharmaceuticals & Biotech"
  | "Travel, Hospitality & Tourism";

export interface Job {
  _id: string;
  userId: string;
  position: string;
  company: string;
  industry: Industry;
  applicationStatus: ApplicationStatus;
  interviewDate?: string;
  appliedDate?: string;
  applicationLink?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  coverImage?: string;
}

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  "Not applied",
  "Applied",
  "In progress",
  "Preparing Interview",
  "Interview",
  "Rejected",
];


export const INDUSTRY_GROUPS: { label: string; items: Industry[] }[] = [
  {
    label: "CSE & TECH SPECIALIZATIONS",
    items: [
      "Software & Technology",
      "Artificial Intelligence & Machine Learning",
      "Cybersecurity & Information Security",
      "Cloud Computing & DevOps",
      "Data Engineering & Analytics",
      "Web & Mobile Development",
      "Embedded Systems & IoT",
      "Game Development & XR",
      "Blockchain & Web3",
      "Robotics & Automation",
    ],
  },
  {
    label: "OTHER INDUSTRIES",
    items: [
      "Retail & Consumer Commerce",
      "Healthcare & Life Sciences",
      "Financial Services & Banking",
      "Engineering & Manufacturing",
      "Media & Digital Entertainment",
      "Infrastructure & Real Estate",
      "Consumer Goods & FMCG",
      "Pharmaceuticals & Biotech",
      "Travel, Hospitality & Tourism",
    ],
  },
];

export const INDUSTRIES: Industry[] = INDUSTRY_GROUPS.flatMap((g) => g.items);
