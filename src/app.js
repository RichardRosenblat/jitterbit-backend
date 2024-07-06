import express from 'express';
import bodyParser from 'body-parser';
// import orderRoutes from './routes/orderRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

const app = express();

app.use(bodyParser.json());

app.use('/api', healthRoutes);
// app.use('/api', orderRoutes);

export default app;
