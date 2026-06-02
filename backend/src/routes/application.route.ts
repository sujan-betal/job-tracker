import express from "express";
import {
    addApplication,
    getAllApplications,
    getDashboardStats,
    getRecentApplications,
    updateApplication,
    deleteApplication,
} from "../controllers/application.controller.js";
import {
    createApplicationValidation,
    updateApplicationValidation,
} from "../validations/application.validation.js";
import customErrorHandler from "../utils/customErrorHandler.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Apply authenticate middleware to all routes in this file
router.use(authenticate);

router.post("/", createApplicationValidation, customErrorHandler, addApplication);
router.get("/", getAllApplications);
router.get("/stats", getDashboardStats);
router.get("/recent", getRecentApplications);
router.put("/:id", updateApplicationValidation, customErrorHandler, updateApplication);
router.delete("/:id", deleteApplication);

export default router;
