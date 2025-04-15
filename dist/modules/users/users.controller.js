"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const users_service_1 = require("./users.service");
class UserController {
    constructor() {
        this.userService = new users_service_1.UserService();
    }
    async getAll() {
        return await this.userService.getAll();
    }
}
exports.UserController = UserController;
