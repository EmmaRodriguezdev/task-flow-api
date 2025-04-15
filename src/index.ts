import express from 'express';
import sequelize from './config/database';
import { registerRoutes } from './routes';

const app = express();

app.use(express.json());

registerRoutes(app);

sequelize.sync().then(() => {
  console.log('✅ DB connected & models synced');
})

export default app;