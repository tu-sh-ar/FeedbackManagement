"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildResponse = exports.buildObjectResponse = exports.buildErrorResponse = void 0;
function buildErrorResponse(res, message, code) {
    const errorResponse = {
        message,
        statusCode: code,
    };
    return res.status(code).send(errorResponse);
}
exports.buildErrorResponse = buildErrorResponse;
function buildObjectResponse(res, object) {
    const successResponse = {
        response: object,
        statusCode: 200,
    };
    return res.status(200).send(successResponse);
}
exports.buildObjectResponse = buildObjectResponse;
function buildResponse(res, message, code) {
    const successResponse = {
        message,
        statusCode: code,
    };
    return res.status(200).send(successResponse);
}
exports.buildResponse = buildResponse;
