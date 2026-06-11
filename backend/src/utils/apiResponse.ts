import { Response } from "express";

export const apiResponseErr = (
    data: any,
    success: boolean,
    responseCode: number,
    errMessage: string,
    res: Response
) => {
    return res.status(responseCode).send({
        data,
        success,
        responseCode,
        errMessage: errMessage ?? "Something went wrong",
    });
};

export const apiResponseSuccess = (
    data: any,
    success: boolean,
    responseCode: number,
    message: string,
    res: Response,
    pagination: any = null
) => {
    return res.status(responseCode).send({
        data,
        success,
        responseCode,
        message,
        pagination,
    });
};

export const apiResponsePagination = (
    data: any,
    success: boolean,
    responseCode: number,
    message: string,
    pagination: {
        page: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
    },
    res: Response
) => {
    return res.status(responseCode).send({
        data,
        success,
        responseCode,
        message,
        pagination: {
            page: pagination.page,
            pageSize: pagination.pageSize,
            totalPages: pagination.totalPages,
            totalItems: pagination.totalItems,
        },
    });
};