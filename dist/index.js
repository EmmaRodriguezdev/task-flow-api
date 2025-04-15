"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, routes_1.registerRoutes)(app);
database_1.default.sync().then(() => {
    console.log('✅ DB connected & models synced');
});
exports.default = app;
