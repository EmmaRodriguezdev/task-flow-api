"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const users_model_1 = require("./users.model");
class UserService {
    constructor() { }
    async getAll() {
        return await users_model_1.User.findAll();
    }
}
exports.UserService = UserService;
