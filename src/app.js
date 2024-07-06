import express from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './routes/order.routes.js';
import healthRoutes from './routes/health.routes.js';

const app = express();

app.use(bodyParser.json());

app.use('/', orderRoutes);
app.use('/', healthRoutes);

export default app;
