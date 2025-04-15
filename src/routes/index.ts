import { Express } from "express";
import usersRoutes from "../modules/users/users.routes";

export function registerRoutes(app: Express) {
    app.use('/', usersRoutes)
}