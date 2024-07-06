import express from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './routes/order.routes.js';
import healthRoutes from './routes/health.routes.js';
import swaggerOptions from './swagger/swaggerOptions.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

// Cria a aplicação express
const app = express();

// Configuração do Swagger
const specs = swaggerJsdoc(swaggerOptions);

// Aplica o middleware de parse do body para JSON
app.use(bodyParser.json());

// Adiciona as rotas da aplicação
app.use('/', orderRoutes);
app.use('/', healthRoutes);

// Adiciona a rota de documentação do Swagger
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

export default app;
