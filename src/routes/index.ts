import { Express } from "express";
import usersRoutes from "../modules/users/users.routes";
import authRoutes from "../modules/auth/auth.routes";

export function registerRoutes(app: Express) {
    app.use('/', usersRoutes)
    app.use('/auth', authRoutes)
}