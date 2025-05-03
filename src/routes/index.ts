import { Express } from "express";
import usersRoutes from "../modules/users/users.routes";
import authRoutes from "../modules/auth/auth.routes";
import workspacesRoutes from "../modules/workspaces/workspaces.routes";
import tasksRoutes from "../modules/tasks/tasks.routes";
import openaiRoutes from "../modules/openai/openai.routes";

export function registerRoutes(app: Express) {
    app.use('/api', usersRoutes)
    app.use('/api/auth', authRoutes)
    app.use('/api/workspaces', workspacesRoutes)
    app.use('/api/tasks', tasksRoutes)
    app.use('/api/openai', openaiRoutes)
}