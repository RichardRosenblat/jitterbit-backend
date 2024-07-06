import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
// Rotas para verificar a saúde da API e do banco de dados


/**
 * @swagger
 * tags:
 *   name: Health Endpoints
 *   description: Endpoints relacionados à verificação de saúde da API e do banco de dados
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Retorna o estado da API e do banco de dados
 *     tags: [Health Endpoints]
 *     responses:
 *       200:
 *         description: Esta resposta indica que a API e o banco de dados estão funcionando corretamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 api:
 *                   type: string
 *                   description: Estado da API
 *                   example: OK
 *                 database:
 *                   type:   Disconnected | Connected | Connecting | Disconnecting
 *                   description: Estado do banco de dados
 *                   example: Connected
 */
router.get('/health', (_req, res) => {
  console.log('GET /health');
  const states = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting",
  }

  res.status(200).json(
    {
      api: 'OK',
      database: states[mongoose.connection.readyState],
    }
  );
});

export default router;
