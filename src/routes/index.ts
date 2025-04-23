import { Express } from "express";
import usersRoutes from "../modules/users/users.routes";
import authRoutes from "../modules/auth/auth.routes";
import workspacesRoutes from "../modules/workspaces/workspaces.routes";
import tasksRoutes from "../modules/tasks/tasks.routes";

export function registerRoutes(app: Express) {
    app.use('/', usersRoutes)
    app.use('/auth', authRoutes)
    app.use('/workspaces', workspacesRoutes)
    app.use('/tasks', tasksRoutes)
}