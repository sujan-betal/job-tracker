import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { StatusCode } from "../utils/statusCodes.js";
import { apiResponseErr } from "../utils/apiResponse.js";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return apiResponseErr(
        null,
        false,
        StatusCode.unauthorized,
        "Token missing",
        res
      );
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      return apiResponseErr(
        null,
        false,
        StatusCode.unauthorized,
        "Invalid token format",
        res
      );
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    // JWT payload se user id nikalo
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return apiResponseErr(
        null,
        false,
        StatusCode.unauthorized,
        "User not found",
        res
      );
    }

    // req.user me actual DB user store karo
    req.user = user;

    next();
  } catch (error) {
    console.error("❌ Auth Error:", error);  // ← ye add karo
    return apiResponseErr(
      null,
      false,
      StatusCode.unauthorized,
      "Invalid or expired token",
      res
    );
  }
};