import express from 'express';
import sequelize from './config/database';
import { registerRoutes } from './routes';
import './config/models/relations';

const app = express();

app.use(express.json());

registerRoutes(app);

export default app;