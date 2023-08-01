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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const documentation_1 = require("./documentation");
const db_1 = require("./db");
const startServerAndInitConfiguration = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = (0, express_1.default)();
    // using body parser
    server.use(express_1.default.json());
    // using cross origin resource sharing for all the routes
    // Access-Control-Allow-Origin: * i.e api accessed from any routes
    server.use((0, cors_1.default)());
    server.use('/api/v1', routes_1.default);
    const specs = (0, swagger_jsdoc_1.default)(documentation_1.SwaggerOptions);
    server.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs, { explorer: true }));
    yield (0, db_1.configureDB)();
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Server is now running on port ${PORT}`);
    });
});
// starts server 
startServerAndInitConfiguration();
