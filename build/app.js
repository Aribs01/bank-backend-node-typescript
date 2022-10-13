"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.API_PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1', index_1.default);
app.listen(port, function () {
    console.log("Server is running at ".concat(port, "..."));
});
