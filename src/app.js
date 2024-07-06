import express from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './routes/orderRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

const app = express();

app.use(bodyParser.json());

app.use('/', orderRoutes);
app.use('/', healthRoutes);

export default app;
