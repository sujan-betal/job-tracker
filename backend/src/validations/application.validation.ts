import { body } from "express-validator";

export const createApplicationValidation = [
    body("company")
        .notEmpty()
        .withMessage("Company name is required")
        .trim(),
    body("position")
        .notEmpty()
        .withMessage("Position/Role is required")
        .trim(),
    body("location")
        .optional()
        .trim(),
    body("salary")
        .optional()
        .trim(),
    body("status")
        .optional()
        .isIn(["applied", "in_progress", "review", "offer", "rejected"])
        .withMessage("Invalid status value"),
    body("appliedDate")
        .notEmpty()
        .withMessage("Applied date is required")
        .isISO8601()
        .withMessage("Applied date must be a valid ISO8601 date (YYYY-MM-DD)"),
    body("jobUrl")
        .optional()
        .trim(),
    body("notes")
        .optional()
        .trim(),
];

export const updateApplicationValidation = [
    body("company")
        .optional()
        .notEmpty()
        .withMessage("Company name cannot be empty")
        .trim(),
    body("position")
        .optional()
        .notEmpty()
        .withMessage("Position/Role cannot be empty")
        .trim(),
    body("location")
        .optional()
        .trim(),
    body("salary")
        .optional()
        .trim(),
    body("status")
        .optional()
        .isIn(["applied", "in_progress", "review", "offer", "rejected"])
        .withMessage("Invalid status value"),
    body("appliedDate")
        .optional()
        .isISO8601()
        .withMessage("Applied date must be a valid ISO8601 date (YYYY-MM-DD)"),
    body("jobUrl")
        .optional()
        .trim(),
    body("notes")
        .optional()
        .trim(),
];
