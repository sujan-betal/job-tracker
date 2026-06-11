import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { StatusCode } from "./statusCodes.js";

const customErrorHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((error: any) => {
            let value;
            const field = error.path || error.param;

            switch (error.location) {
                case "body":
                    value = req.body?.[field];
                    break;
                case "query":
                    value = req.query?.[field];
                    break;
                case "params":
                    value = req.params?.[field];
                    break;
                case "headers":
                    value = req.headers?.[field];
                    break;
                default:
                    value = undefined;
            }

            return {
                type: "field",
                value,
                msg: error.msg,
                path: field,
                location: error.location || "body",
            };
        });

        const allErrors = formattedErrors.map((e) => e.msg);
        console.error("❌ Validation Errors:", allErrors.join(", "));

        return res.status(StatusCode.badRequest).json({
            data: null,
            success: false,
            errMessage: formattedErrors[0].msg,
            responseCode: StatusCode.badRequest,
            additionalErr: allErrors.join(", "),
        });
    }

    next();
};

export default customErrorHandler;