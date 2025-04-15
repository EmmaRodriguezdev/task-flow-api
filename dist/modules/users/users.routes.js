"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
class UsersRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userController = new users_controller_1.UserController();
        this.setupRouter();
    }
    setupRouter() {
        this.router.get('/users', async (_req, res) => {
            res.send(await this.userController.getAll());
        });
    }
}
exports.UsersRoutes = UsersRoutes;
exports.default = new UsersRoutes().router;
