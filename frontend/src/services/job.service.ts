// Baad mein yahan real API calls aayengi
// Abhi ke liye mock data use ho raha hai

import { MOCK_JOBS } from "../data/jobs";
import type { Job } from "../types/job.types";

export const JobService = {
  getAll: (): Job[] => MOCK_JOBS,
  getById: (id: number): Job | undefined =>
    MOCK_JOBS.find(j => j.id === id),
};
