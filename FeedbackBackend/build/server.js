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
// creating the server 
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
// using cors
const cors_1 = __importDefault(require("cors"));
// importing morgan for logging
const get_current_date_1 = require("./middlewares/logging_function/get_current_date");
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// importing routes
const feedback_template_route_1 = __importDefault(require("./routes/feedback_template_route"));
const feedback_route_1 = __importDefault(require("./routes/feedback_route"));
const feedback_response_route_1 = __importDefault(require("./routes/feedback_response_route"));
//importing test routes
const user_routes_1 = __importDefault(require("./routes/user_routes"));
const client_routes_1 = __importDefault(require("./routes/client_routes"));
const product_routes_1 = __importDefault(require("./routes/product_routes"));
// importing the  db config 
const db_connect_1 = __importDefault(require("./db/db-connect"));
//importing swagger modules for documentation
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// connect db function 
const start_server = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_connect_1.default)();
        server_config();
    }
    catch (error) {
        console.log("Error in connecting db");
    }
});
// making access stream for morgan logger (for both access and error )
const logFilePath = path_1.default.join('app_logs', `${(0, get_current_date_1.getCurrentDate)()}.log`);
const logStream = fs_1.default.createWriteStream(logFilePath, { flags: 'a' });
const server_config = () => {
    // using body parser
    server.use(express_1.default.json());
    // using cross origin resource sharing for all the routes
    // Access-Control-Allow-Origin: * i.e api accessed from any routes
    server.use((0, cors_1.default)());
    // setting up morgan
    server.use((0, morgan_1.default)('combined', {
        stream: logStream
    }));
    // setting up routin middlewares
    server.use("/api/feedbackTemplate", feedback_template_route_1.default);
    server.use("/api/feedback", feedback_route_1.default);
    server.use("/api/response", feedback_response_route_1.default);
    // test routes
    server.use("/api/user", user_routes_1.default);
    server.use("/api/client", client_routes_1.default);
    server.use("/api/product", product_routes_1.default);
    const port = process.env.PORT || 4000;
    server.listen(port, () => {
        console.log(`Server running at ${port}`);
    });
};
// start the server 
start_server();
// making swagger configurations
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Feedback Management Swagger UI",
            version: "0.1.0",
            description: "Feedback Management API ",
        },
        servers: [
            {
                url: "https://feedbackbackend-dev.azurewebsites.net",
            },
        ],
    },
    apis: ["./routes/*.ts", "./src/documentation/*.yaml"],
};
const specs = (0, swagger_jsdoc_1.default)(options);
server.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs, { explorer: true }));
