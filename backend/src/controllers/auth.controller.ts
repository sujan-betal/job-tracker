import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { StatusCode } from "../utils/statusCodes.js";
import { apiResponseSuccess, apiResponseErr } from "../utils/apiResponse.js";

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
    return apiResponseErr(
      null,
      false,
      StatusCode.internalServerError,
      "something went wrong",
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
                },
            },
            true,
            StatusCode.success,
            "Login successful",
            res
        );
    } catch (error: any) {
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
