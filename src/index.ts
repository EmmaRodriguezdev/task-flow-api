import express from 'express';
import './infrastructure/database/models';
import cors from 'cors'
import { Container } from './config/container';
import { errorHandler } from './infrastructure/web/middlewares/errorHandler';
import { AuthRouter } from './infrastructure/web/routes/AuthRoutes';
import { TaskRouter } from './infrastructure/web/routes/TaskRoutes';
import { WorkspaceRouter } from './infrastructure/web/routes/WorkspaceRoutes';
import { CohereAIRouter } from './infrastructure/web/routes/CohereAIRoutes';

const app = express();
app.use(cors())
app.use(express.json());

const container = new Container()
container.setupServices()

const authRouter = new AuthRouter(container)
app.use('/api/auth', authRouter.getRouter())

app.use(errorHandler)

const taskRouter = new TaskRouter(container)
app.use('/api/tasks', taskRouter.getRouter())

app.use(errorHandler)

const workspaceRouter = new WorkspaceRouter(container)
app.use('/api/workspace', workspaceRouter.getRouter())

app.use(errorHandler)

const cohereAIRouter = new CohereAIRouter(container)
app.use('/api/cohereai', cohereAIRouter.getRouter())

app.use(errorHandler)

export default app;