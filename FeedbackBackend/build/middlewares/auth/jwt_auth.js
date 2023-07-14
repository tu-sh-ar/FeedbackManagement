"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const constants_1 = require("../../constants/constants");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    let authHeader = req.headers.authorization;
    if (authHeader && authHeader.toString().startsWith('Bearer')) {
        token = authHeader.toString().split(' ')[1];
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, constants_1.auth_constant.secret);
            if (decodedToken) {
                // Access the token claims
                const email = decodedToken.email;
                const id = decodedToken.id;
                const role = decodedToken.role;
                const businessCategory = decodedToken.businessCategory;
                let parsedRoleId;
                if (typeof role === 'string') {
                    parsedRoleId = parseInt(role, 10);
                    if (isNaN(parsedRoleId)) {
                        res.status(401).json({ error: 'Unauthorized' });
                    }
                }
                else if (typeof role !== 'number') {
                    res.status(401).json({ error: 'Unauthorized' });
                }
                // Convert clientId to a number if possible
                let parsedClientId;
                if (typeof id === 'string') {
                    parsedClientId = parseInt(id, 10);
                    if (isNaN(parsedClientId)) {
                        res.status(400).json({ error: 'User Id should be a number or convertible to a number' });
                    }
                }
                else if (typeof id !== 'number') {
                    res.status(400).json({ error: 'User Id should be a number or convertible to a number' });
                }
                // Storing the extracted information for later use or pass it to the next middleware
                req.user = {
                    id: parsedClientId,
                    email,
                    role: parsedRoleId
                };
                next();
            }
            else {
                res.status(401).send('Invalid Token');
            }
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                res.status(401).send('Token has expired');
            }
            else {
                res.status(401).send(error);
            }
        }
    }
    else {
        res.status(401).send('Authorization header missing');
    }
});
exports.verifyToken = verifyToken;
