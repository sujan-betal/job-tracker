import { Request, Response } from "express";
import * as applicationService from "../services/application.service.js";
import { StatusCode } from "../utils/statusCodes.js";
import { apiResponseSuccess, apiResponseErr } from "../utils/apiResponse.js";

export const addApplication = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const newApp = await applicationService.addApplication(userId, req.body);
        return apiResponseSuccess(
            newApp,
            true,
            StatusCode.created,
            "Application added successfully",
            res
        );
    } catch (error: any) {
        return apiResponseErr(
            null,
            false,
            StatusCode.internalServerError,
            error.message || "Failed to add application",
            res
        );
    }
};

export const getAllApplications = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const apps = await applicationService.getAllApplications(userId);
        return apiResponseSuccess(
            apps,
            true,
            StatusCode.success,
            "Applications fetched successfully",
            res
        );
    } catch (error: any) {
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
