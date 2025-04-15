"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const users_routes_1 = __importDefault(require("../modules/users/users.routes"));
function registerRoutes(app) {
    app.use('/', users_routes_1.default);
}
