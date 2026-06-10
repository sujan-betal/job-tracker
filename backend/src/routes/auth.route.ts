import express from "express";
import { register, login, addApplication,getProfile } from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../validations/auth.validation.js";
import customErrorHandler from "../utils/customErrorHandler.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createApplicationValidation } from "../validations/auth.validation.js";


const router = express.Router();

router.post("/register", registerValidation, customErrorHandler, register);
router.post("/login", loginValidation, customErrorHandler, login);

router.post("/add", authenticate, createApplicationValidation, customErrorHandler, addApplication);
// router.get("/api/user/profile", authenticate, getProfile);


// router.get("/", getAllApplications);
// router.get("/stats", getDashboardStats);
// router.get("/recent", getRecentApplications);
// router.put("/:id", updateApplicationValidation, customErrorHandler, updateApplication);
// router.delete("/:id", deleteApplication);

export default router;
