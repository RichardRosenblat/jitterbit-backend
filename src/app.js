import express from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './routes/order.routes.js';
import healthRoutes from './routes/health.routes.js';

// Cria a aplicação express
const app = express();

// Aplica o middleware de parse do body para JSON
app.use(bodyParser.json());

// Adiciona as rotas da aplicação
app.use('/', orderRoutes);
app.use('/', healthRoutes);

export default app;
