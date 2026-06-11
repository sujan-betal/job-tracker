import Application from "../models/application.model.js";
import User from "../models/user.model.js";
import { IApplication, IDashboardStats } from "../interfaces/application.interface.js";

export const addApplication = async (
    userId: number,
    data: Omit<IApplication, "id" | "userId">
): Promise<IApplication> => {
    const application = await Application.create({ userId, ...data });
    return application as unknown as IApplication;
};

export const getAllApplications = async (userId: number): Promise<IApplication[]> => {
    console.log(`📡 DB Query: Fetching applications for userId ${userId}`);
    const applications = await Application.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
    });
    console.log(`📡 DB Result: ${applications.length} rows found`);
    return applications as unknown as IApplication[];
};

export const getRecentApplications = async (userId: number): Promise<IApplication[]> => {
    const applications = await Application.findAll({
        where: { userId },
        limit: 5,
        order: [["createdAt", "DESC"]],
    });
    return applications as unknown as IApplication[];
};

export const getDashboardStats = async (userId: number): Promise<IDashboardStats> => {
    console.log(`📊 DB Query: Fetching stats for userId ${userId}`);
    const total = await Application.count({ where: { userId } });
    const inProgress = await Application.count({ where: { userId, status: "in_progress" } });
    const reviews = await Application.count({ where: { userId, status: "review" } });
    const offers = await Application.count({ where: { userId, status: "offer" } });

    console.log(`📊 DB Result: Total=${total}, InProgress=${inProgress}, Reviews=${reviews}, Offers=${offers}`);

    return {
        total_applied: total,
        in_progress: inProgress,
        reviews,
        offers,
    };
};

export const updateApplication = async (
    id: number,
    userId: number,
    data: Partial<IApplication>
): Promise<IApplication> => {
    const application = await Application.findOne({ where: { id, userId } });
    if (!application) throw new Error("Application not found");
    await application.update(data);
    return application as unknown as IApplication;
};

export const deleteApplication = async (
    id: number,
    userId: number
): Promise<{ message: string }> => {
    const application = await Application.findOne({ where: { id, userId } });
    if (!application) throw new Error("Application not found");
    await application.destroy();
    return { message: "Application deleted successfully" };
};