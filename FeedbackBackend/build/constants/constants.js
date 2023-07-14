"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_constant = exports.auto_response = exports.status_codes = void 0;
// constants for status codes
exports.status_codes = {
    200: "Success",
    400: "Bad Request, Invalid data",
    404: "Data Not Found",
    401: "Unauthorized Access , Token not valid",
    500: "Server Error, request failed"
};
// constants for feedback response
exports.auto_response = {
    good: "Thank You for the feedback",
    inconvinient: "Sorry for the inconveniences. We will look into the issue"
};
// auth constants 
exports.auth_constant = {
    secret: "safmdknfsdDKFKN122sdnmkfnsJDKNF23234Sssds"
};
