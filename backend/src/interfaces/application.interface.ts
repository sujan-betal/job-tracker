export interface IApplication {
    id?: number;
    userId: number;
    company: string;
    position: string;
    location?: string;
    salary?: string;
    status: "applied" | "in_progress" | "review" | "offer" | "rejected";
    appliedDate: Date;
    jobUrl?: string;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IDashboardStats {
    total_applied: number;
    in_progress: number;
    reviews: number;
    offers: number;
}