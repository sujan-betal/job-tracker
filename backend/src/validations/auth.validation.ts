import { body } from "express-validator";

export const registerValidation = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters long"),
    body("email")
        .isEmail()
        .withMessage("Must be a valid email address"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

export const loginValidation = [
    body("email")
        .isEmail()
        .withMessage("Must be a valid email address"),
    body("password")
        .notEmpty()
        .withMessage("Password is required"),
];
