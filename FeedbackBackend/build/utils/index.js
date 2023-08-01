"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueFileName = exports.generateUrlWithToken = exports.areContiguousIntegersStartingFromOne = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants/constants");
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
function areContiguousIntegersStartingFromOne(numbers) {
    if (numbers.length === 0) {
        return false;
    }
    const sortedNumbers = numbers.slice().sort((a, b) => a - b);
    if (sortedNumbers[0] !== 1) {
        return false;
    }
    for (let i = 1; i < sortedNumbers.length; i++) {
        if (sortedNumbers[i] - sortedNumbers[i - 1] !== 1) {
            return false;
        }
    }
    return true;
}
exports.areContiguousIntegersStartingFromOne = areContiguousIntegersStartingFromOne;
function generateUrlWithToken(templateId, linkBodyDto) {
    const payload = {
        templateId: templateId,
        linkBodyDto
    };
    const secretKey = constants_1.auth_constant.secret;
    const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' });
    const baseUrl = constants_1.feedbackFormUrl;
    const urlWithToken = `${baseUrl}/${token}`;
    return urlWithToken;
}
exports.generateUrlWithToken = generateUrlWithToken;
function generateUniqueFileName(originalFileName) {
    const fileExtension = path_1.default.extname(originalFileName);
    const randomString = crypto_1.default.randomBytes(3).toString('hex');
    const timestamp = new Date().getTime();
    const uniqueName = `${path_1.default.basename(originalFileName, fileExtension)}_${randomString}_${timestamp}${fileExtension}`;
    return uniqueName;
}
exports.generateUniqueFileName = generateUniqueFileName;
