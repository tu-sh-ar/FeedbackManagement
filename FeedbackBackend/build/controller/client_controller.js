"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client_login = exports.clientSignup = void 0;
const client_model_1 = __importDefault(require("../model/client_model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// create user 
const clientSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_details = req.body;
    yield client_model_1.default.create(user_details)
        .then(user => res.status(201).send(user))
        .catch(err => res.status(400).send(err));
});
exports.clientSignup = clientSignup;
// user login
const client_login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    yield client_model_1.default.findOne({ email: email, password: password })
        .then(data => {
        if (data) {
            const token = jsonwebtoken_1.default.sign({
                user: {
                    email: data === null || data === void 0 ? void 0 : data.email,
                    id: data === null || data === void 0 ? void 0 : data._id
                }
            }, 'secret', { expiresIn: "100m" });
            // res.cookie('jwtToken', token, {
            //     httpOnly: true,
            //     maxAge: 100 * 60 * 1000    // Expires in 100 minutes
            //   });
            res.status(200).send(token);
        }
        else {
            res.status(400).send(" Invalid credentials");
        }
    })
        .catch(err => res.status(500).send("Internal Server Error"));
});
exports.client_login = client_login;
