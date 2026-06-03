import express from "express";
import { register, login, getProfile } from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../validations/auth.validation.js";
import customErrorHandler from "../utils/customErrorHandler.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidation, customErrorHandler, register);
router.post("/login", loginValidation, customErrorHandler, login);
// router.get("/api/user/profile", authenticate, getProfile);

// router.post("/", createApplicationValidation, customErrorHandler, addApplication);
// router.get("/", getAllApplications);
// router.get("/stats", getDashboardStats);
// router.get("/recent", getRecentApplications);
// router.put("/:id", updateApplicationValidation, customErrorHandler, updateApplication);
// router.delete("/:id", deleteApplication);

export default router;
