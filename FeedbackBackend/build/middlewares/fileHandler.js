"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.fileStorage = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const utils_1 = require("../utils");
exports.fileStorage = multer_1.default.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        const uniqueFileName = (0, utils_1.generateUniqueFileName)(file.originalname);
        callback(null, uniqueFileName);
    }
});
const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
        return cb(null, false);
    }
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
        return cb(null, false);
    }
    cb(null, true);
};
// Create multer upload instance
exports.upload = (0, multer_1.default)({ storage: exports.fileStorage, fileFilter: fileFilter });
const uploadMiddleware = (req, res, next) => {
    exports.upload.array('files', 5)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        const files = req.files;
        const errors = [];
        files.forEach((file) => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (!allowedTypes.includes(file.mimetype)) {
                errors.push(`Invalid file type: ${file.originalname}`);
            }
            if (file.size > maxSize) {
                errors.push(`File too large: ${file.originalname}`);
            }
        });
        if (errors.length > 0) {
            files.forEach((file) => {
                fs_1.default.unlinkSync(file.path);
            });
            return res.status(400).json({ errors });
        }
        req.files = files;
        next();
    });
};
exports.default = uploadMiddleware;
