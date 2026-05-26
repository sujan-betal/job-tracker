import type { Job } from "../types/job.types";

export const MOCK_JOBS: Job[] = [
  { id: 1, company: "Stripe",  role: "Senior Frontend Engineer", location: "Remote",        salary: "$160k–$200k", applied: "May 2",  status: "Interview", logo: "S", color: "#635BFF" },
  { id: 2, company: "Notion",  role: "Product Designer",         location: "San Francisco", salary: "$140k–$170k", applied: "May 5",  status: "Applied",   logo: "N", color: "#000000" },
  { id: 3, company: "Vercel",  role: "Developer Advocate",       location: "Remote",        salary: "$130k–$155k", applied: "Apr 28", status: "Offer",     logo: "▲", color: "#111111" },
  { id: 4, company: "Linear",  role: "UI Engineer",              location: "Remote",        salary: "$150k–$180k", applied: "Apr 20", status: "Rejected",  logo: "L", color: "#5E6AD2" },
];
