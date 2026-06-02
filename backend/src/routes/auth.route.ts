import express from "express";
import { register, login, getProfile } from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../validations/auth.validation.js";
import customErrorHandler from "../utils/customErrorHandler.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidation, customErrorHandler, register);
router.post("/login", loginValidation, customErrorHandler, login);
router.get("/profile", authenticate, getProfile);

export default router;
