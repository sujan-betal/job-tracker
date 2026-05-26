import { useState, useMemo } from "react";
import type { Job, JobStatus } from "../types/job.types";

export type ViewMode = "board" | "list";

export function useJobFilter(jobs: Job[]) {
  const [activeStatus, setActiveStatus] = useState<JobStatus | "All">("All");
  const [search, setSearch]             = useState("");
  const [view, setView]                 = useState<ViewMode>("board");

  const filtered = useMemo(() => jobs.filter(job => {
    const matchStatus = activeStatus === "All" || job.status === activeStatus;
    const q           = search.toLowerCase();
    const matchSearch = job.company.toLowerCase().includes(q) || job.role.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  }), [jobs, activeStatus, search]);

  const stats = useMemo(() => ({
    total:     jobs.length,
    applied:   jobs.filter(j => j.status === "Applied").length,
    interview: jobs.filter(j => j.status === "Interview").length,
    offer:     jobs.filter(j => j.status === "Offer").length,
  }), [jobs]);

  return { filtered, stats, activeStatus, setActiveStatus, search, setSearch, view, setView };
}
