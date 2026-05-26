import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCode } from "../utils/statusCodes.js";
import { apiResponseErr } from "../utils/apiResponse.js";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return apiResponseErr(null, false, StatusCode.unauthorized, "Token missing", res);
        }

        const parts = authHeader.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return apiResponseErr(null, false, StatusCode.unauthorized, "Invalid token format", res);
        }

        const token = parts[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

        req.user = decoded;

        next();

    } catch (error) {
        return apiResponseErr(null, false, StatusCode.unauthorized, "Invalid or expired token", res);
    }
};