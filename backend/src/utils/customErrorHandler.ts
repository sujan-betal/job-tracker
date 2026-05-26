import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { StatusCode } from "./statusCodes.js";

const customErrorHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((error: any) => {
            let value;

            switch (error.location) {
                case "body":
                    value = req.body?.[error.param];
                    break;
                case "query":
                    value = req.query?.[error.param];
                    break;
                case "params":
                    value = req.params?.[error.param];
                    break;
                case "headers":
                    value = req.headers?.[error.param];
                    break;
                default:
                    value = undefined;
            }

            return {
                type: "field",
                value,
                msg: error.msg,
                path: error.param,
                location: "body",
            };
        });

        const allErrors = formattedErrors.map((e) => e.msg);

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