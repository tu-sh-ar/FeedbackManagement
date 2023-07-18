import { Response } from 'express';

interface ErrorResponse {
    message: string;
    statusCode: number;
}

interface SuccessObjectResponse<T> {
    response: T;
    statusCode: number;
}

interface SuccessMessageResponse {
    message: string;
    statusCode: number;
}

function buildErrorResponse(res: Response, message: string, code: number): void {
    const errorResponse: ErrorResponse = {
        message,
        statusCode: code,
    };
    res.status(code).send(errorResponse);
}

function buildObjectResponse<T>(res: Response, object: T): void {
    const successResponse: SuccessObjectResponse<T> = {
        response: object,
        statusCode: 200,
    };
    res.status(200).send(successResponse);
}

function buildResponse(res: Response, message: string, code: number): void {
    const successResponse: SuccessMessageResponse = {
        message,
        statusCode: code,
    };
    res.status(200).send(successResponse);
}

export { buildErrorResponse, buildObjectResponse, buildResponse };