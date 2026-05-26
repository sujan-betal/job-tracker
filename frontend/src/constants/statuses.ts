import type { JobStatus } from "../types/job.types";

export const STATUSES: JobStatus[] = ["Applied", "Interview", "Offer", "Rejected"];

export const STATUS_META: Record<JobStatus, { color: string; bg: string; dot: string }> = {
  Applied:   { color: "#60A5FA", bg: "rgba(96,165,250,0.12)",  dot: "#60A5FA" },
  Interview: { color: "#FBBF24", bg: "rgba(251,191,36,0.12)",  dot: "#FBBF24" },
  Offer:     { color: "#34D399", bg: "rgba(52,211,153,0.12)",  dot: "#34D399" },
  Rejected:  { color: "#F87171", bg: "rgba(248,113,113,0.12)", dot: "#F87171" },
};
