import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Application from "../models/application.model.js";
import { StatusCode } from "../utils/statusCodes.js";
import { apiResponseSuccess, apiResponseErr } from "../utils/apiResponse.js";
import * as applicationService from "../services/application.service.js";

export const register = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({
            where: { email },
        });

        if (existingUser) {
            return apiResponseErr(
                null,
                false,
                StatusCode.conflict,
                "Email already registered",
                res
            );
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user: any = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "7d",
            }
        );

        return apiResponseSuccess(
            {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            },
            true,
            StatusCode.created,
            "User registered successfully",
            res
        );
    } catch (error: any) {
        console.error("❌ Register Error:", error);
        return apiResponseErr(
            null,
            false,
            StatusCode.internalServerError,
            error.message || "something went wrong",
            res
        );
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } }) as any;
        if (!user) {
            return apiResponseErr(
                null,
                false,
                StatusCode.unauthorized,
                "Invalid email or password",
                res
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return apiResponseErr(
                null,
                false,
                StatusCode.unauthorized,
                "Invalid email or password",
                res
            );
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        return apiResponseSuccess(
            {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            },
            true,
            StatusCode.success,
            "Login successful",
            res
        );
    } catch (error: any) {
        console.error("❌ Login Error:", error);
        return apiResponseErr(
            null,
            false,
            StatusCode.internalServerError,
            error.message || "Something went wrong during login",
            res
        );
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"] },
        }) as any;

        if (!user) {
            return apiResponseErr(
                null,
                false,
                StatusCode.notFound,
                "User not found",
                res
            );
        }

        return apiResponseSuccess(
            user,
            true,
            StatusCode.success,
            "Profile fetched successfully",
            res
        );
    } catch (error: any) {
        return apiResponseErr(
            null,
            false,
            StatusCode.internalServerError,
            error.message || "Something went wrong while fetching profile",
            res
        );
    }
};

export const addApplication = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const { company, position, location, salary, status, appliedDate, jobUrl, notes } = req.body;

        const existingApplication = await Application.findOne({
            where: { userId, company, position }
        });

        if (existingApplication) {
            return apiResponseErr(
                null,
                false,
                StatusCode.conflict,
                "Application already exists",
                res
            );
        }

        const data = await Application.create({
            userId,
            company,
            position,
            location,
            salary,
            status: status || "applied",
            appliedDate,
            jobUrl,
            notes,
        }) as any;

        return apiResponseSuccess(
            {
                id: data.id,
                userId: data.userId,
                company: data.company,
                position: data.position,
                location: data.location,
                salary: data.salary,
                appliedDate: data.appliedDate,
                status: data.status,
                jobUrl: data.jobUrl,
                notes: data.notes,
                createdAt: data.createdAt,
            },
            true,
            StatusCode.created,
            "Application added successfully",
            res
        );
    } catch (error: any) {
        console.error("Error in addApplication:", error);
        return apiResponseErr(
            null,
            false,
            StatusCode.internalServerError,
            "Something went wrong",
            res
        );
    }
};

export const getAllApplications = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const offset = (page - 1) * pageSize;

        const { rows: apps, count: total } = await Application.findAndCountAll({
            where: { userId },
            limit: pageSize,
            offset,
            order: [["createdAt", "DESC"]],
        });

        console.log(`📡 [Backend] Total apps for user ${userId}: ${total}`);
        if (apps.length > 0) {
            console.log(`📡 [Backend] First app found:`, apps[0].toJSON());
        }

        return apiResponseSuccess(
            apps,
            true,
            StatusCode.success,
            "Applications fetched successfully",
            res,
            {
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
                totalItems: total,
            }
        );
    } catch (error: any) {
        console.error("❌ Error in getAllApplications:", error);
        return apiResponseErr(
            null,
            false,
            StatusCode.internalServerError,
            error.message || "Failed to fetch applications",
            res
        );
    }
};
export const getRecentApplications = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const apps = await applicationService.getRecentApplications(userId);
        return apiResponseSuccess(
            apps,
            true,
            StatusCode.success,
            "Recent applications fetched successfully",
            res
        );
    } catch (error: any) {
        return apiResponseErr(
            null,
            false,
            StatusCode.internalServerError,
            error.message || "Failed to fetch recent applications",
            res
        );
    }
};

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const stats = await applicationService.getDashboardStats(userId);
        return apiResponseSuccess(
            stats,
            true,
            StatusCode.success,
            "Dashboard stats fetched successfully",
            res
        );
    } catch (error: any) {
        return apiResponseErr(
            null,
            false,
            StatusCode.internalServerError,
            error.message || "Failed to fetch dashboard stats",
            res
        );
    }
};

export const updateApplication = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const appId = Number(req.params.id);
        const updated = await applicationService.updateApplication(appId, userId, req.body);
        return apiResponseSuccess(
            updated,
            true,
            StatusCode.success,
            "Application updated successfully",
            res
        );
    } catch (error: any) {
        const statusCode = error.message === "Application not found" ? StatusCode.notFound : StatusCode.internalServerError;
        return apiResponseErr(
            null,
            false,
            statusCode,
            error.message || "Failed to update application",
            res
        );
    }
};

export const deleteApplication = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const appId = Number(req.params.id);
        const result = await applicationService.deleteApplication(appId, userId);
        return apiResponseSuccess(
            result,
            true,
            StatusCode.success,
            "Application deleted successfully",
            res
        );
    } catch (error: any) {
        const statusCode = error.message === "Application not found" ? StatusCode.notFound : StatusCode.internalServerError;
        return apiResponseErr(
            null,
            false,
            statusCode,
            error.message || "Failed to delete application",
            res
        );
    }
};

