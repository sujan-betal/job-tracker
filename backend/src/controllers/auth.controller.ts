import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Application from "../models/application.model.js";
import { StatusCode } from "../utils/statusCodes.js";
import { apiResponseSuccess, apiResponseErr } from "../utils/apiResponse.js";
import * as applicationService from "../services/application.service.js";
import cloudinary from "../config/cloudinary.js";
import { v2 as cloudinaryV2 } from "cloudinary";
import Document from "../models/document.model.js";
import Contact from "../models/contact.model.js";

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
                    profileImage: user.profileImage,
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

export const uploadProfileImage = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        console.log(`🚀 [uploadProfileImage] Starting for User ${userId}`);

        if (!req.file) {
            console.error("❌ [uploadProfileImage] No file received");
            return apiResponseErr(null, false, StatusCode.badRequest, "No image uploaded", res);
        }

        const cloud_name = process.env.CLOUDINARY_NAME || process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME;
        const api_key    = process.env.CLOUDINARY_KEY  || process.env.CLOUDINARY_API_KEY   || process.env.API_KEY;
        const api_secret = process.env.CLOUDINARY_SECRET || process.env.CLOUDINARY_API_SECRET || process.env.API_SECRET;

        if (!cloud_name || !api_key || !api_secret) {
            return apiResponseErr(null, false, StatusCode.internalServerError, "Cloudinary configuration missing on server", res);
        }

        const uploadFromBuffer = (fileBuffer: Buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: `job-tracker/profiles`,
                        resource_type: "image",
                    },
                    (error, result) => {
                        if (result) {
                            console.log("✅ [Cloudinary] Image upload success");
                            resolve(result);
                        } else {
                            console.error("❌ [Cloudinary] Image upload failed:", error);
                            reject(error);
                        }
                    }
                );
                stream.end(fileBuffer);
            });
        };

        const result: any = await uploadFromBuffer(req.file.buffer);
        
        const user = await User.findByPk(userId);
        if (!user) {
            console.error(`❌ [uploadProfileImage] User ${userId} not found in DB`);
            return apiResponseErr(null, false, StatusCode.notFound, "User not found", res);
        }

        console.log("💾 [uploadProfileImage] Updating User record with URL:", result.secure_url);
        await user.update({ profileImage: result.secure_url });

        return apiResponseSuccess(
            { profileImage: result.secure_url },
            true,
            StatusCode.success,
            "Profile image updated successfully",
            res
        );
    } catch (error: any) {
        console.error("❌ [uploadProfileImage] Error:", error);
        return apiResponseErr(null, false, StatusCode.internalServerError, `Upload failed: ${error.message}`, res);
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

export const uploadDocument = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        console.log(`🚀 [uploadDocument] Starting for User ${userId}`);

        if (!req.file) {
            console.error("❌ [uploadDocument] No file received");
            return apiResponseErr(null, false, StatusCode.badRequest, "No file uploaded", res);
        }

        const cloud_name = process.env.CLOUDINARY_NAME || process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME;
        const api_key    = process.env.CLOUDINARY_KEY  || process.env.CLOUDINARY_API_KEY   || process.env.API_KEY;
        const api_secret = process.env.CLOUDINARY_SECRET || process.env.CLOUDINARY_API_SECRET || process.env.API_SECRET;

        if (!cloud_name || !api_key || !api_secret) {
            const missing = [];
            if (!cloud_name) missing.push("CLOUD_NAME");
            if (!api_key)    missing.push("API_KEY");
            if (!api_secret) missing.push("API_SECRET");
            
            console.error(`❌ [uploadDocument] Missing Cloudinary Config: ${missing.join(", ")}`);
            return apiResponseErr(null, false, StatusCode.internalServerError, `Cloudinary configuration missing: ${missing.join(", ")}`, res);
        }

        const uploadFromBuffer = (fileBuffer: Buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: `job-tracker/documents`,
                        resource_type: "auto",
                    },
                    (error, result) => {
                        if (result) {
                            console.log("✅ [Cloudinary] Document upload success");
                            resolve(result);
                        } else {
                            console.error("❌ [Cloudinary] Document upload failed:", error);
                            reject(error);
                        }
                    }
                );
                stream.end(fileBuffer);
            });
        };

        const result: any = await uploadFromBuffer(req.file.buffer);

        console.log("💾 [uploadDocument] Saving to DB...");
        const document = await Document.create({
            userId,
            name: req.file.originalname,
            type: req.body.type || "resume",
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format || (req.file.originalname.split(".").pop()) || "unknown",
        });

        return apiResponseSuccess(
            document,
            true,
            StatusCode.created,
            "Document uploaded successfully",
            res
        );
    } catch (error: any) {
        console.error("❌ [uploadDocument] Error:", error);
        return apiResponseErr(null, false, StatusCode.internalServerError, `Upload failed: ${error.message}`, res);
    }
};

export const getDocuments = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const documents = await Document.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]],
        });

        return apiResponseSuccess(
            documents,
            true,
            StatusCode.success,
            "Documents fetched successfully",
            res
        );
    } catch (error: any) {
        return apiResponseErr(null, false, StatusCode.internalServerError, "Failed to fetch documents", res);
    }
};

export const getContacts = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const contacts = await Contact.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]],
        });

        return apiResponseSuccess(
            contacts,
            true,
            StatusCode.success,
            "Contacts fetched successfully",
            res
        );
    } catch (error: any) {
        console.error("❌ [getContacts] Error:", error);
        return apiResponseErr(null, false, StatusCode.internalServerError, "Failed to fetch contacts", res);
    }
};

export const addContact = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        console.log(`🚀 [addContact] Starting for User ${userId}`);
        const { name, role, company, email, phone, linkedIn } = req.body;

        if (!name) {
            console.error("❌ [addContact] Missing name");
            return apiResponseErr(null, false, StatusCode.badRequest, "Name is required", res);
        }

        console.log("💾 [addContact] Creating Contact record in DB...");
        const contact = await Contact.create({
            userId,
            name,
            role,
            company,
            email,
            phone,
            linkedIn,
        });
        console.log("✨ [addContact] Contact created successfully:", (contact as any).id);

        return apiResponseSuccess(
            contact,
            true,
            StatusCode.created,
            "Contact added successfully",
            res
        );
    } catch (error: any) {
        console.error("❌ [addContact] Error:", error);
        return apiResponseErr(null, false, StatusCode.internalServerError, `Failed to add contact: ${error.message || "Database error"}`, res);
    }
};

export const deleteContact = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const contact = await Contact.findOne({ where: { id, userId } });
        if (!contact) {
            return apiResponseErr(null, false, StatusCode.notFound, "Contact not found", res);
        }

        await contact.destroy();

        return apiResponseSuccess(null, true, StatusCode.success, "Contact deleted successfully", res);
    } catch (error: any) {
        console.error("❌ [deleteContact] Error:", error);
        return apiResponseErr(null, false, StatusCode.internalServerError, "Failed to delete contact", res);
    }
};

export const updateContact = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { name, role, company, email, phone, linkedIn } = req.body;

        const contact = await Contact.findOne({ where: { id, userId } });
        if (!contact) {
            return apiResponseErr(null, false, StatusCode.notFound, "Contact not found", res);
        }

        await contact.update({
            name,
            role,
            company,
            email,
            phone,
            linkedIn,
        });

        return apiResponseSuccess(contact, true, StatusCode.success, "Contact updated successfully", res);
    } catch (error: any) {
        console.error("❌ [updateContact] Error:", error);
        return apiResponseErr(null, false, StatusCode.internalServerError, "Failed to update contact", res);
    }
};
