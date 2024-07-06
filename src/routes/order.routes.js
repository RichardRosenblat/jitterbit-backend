import express from 'express';
import orderController from '../controllers/order.controller.js';

const router = express.Router();
// Envia as requisições para as funções específicas do controler de pedidos


/**
 * @swagger
 * tags:
 *   name: Order Endpoints
 *   description: Endpoints relacionados ao gerenciamento de pedidos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderResponseDTO:
 *       type: object
 *       properties:
 *         orderId:
 *           type: string
 *           description: ID do pedido
 *           example: v10089015vdb-01
 *         value:
 *           type: number
 *           description: Valor total do pedido
 *           example: 100200
 *         creationDate:
 *           type: string
 *           format: date-time
 *           description: Data de criação do pedido
 *           example: 2023-07-19T12:24:11.529Z
 *         items:
 *           type: array
 *           description: Itens do pedido
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: ID do produto dentro do pedido
 *                 example: 2434
 *               quantity:
 *                 type: integer
 *                 description: Quantidade do produto dentro do pedido
 *                 example: 11
 *               price:
 *                 type: number
 *                 description: Preço do produto dentro do pedido
 *                 example: 1000
 *     InternalServerErrorResponseDTO:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensagem de erro
 *           example: "Internal Server Error."
 *     NotFoundResponseDTO:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensagem de erro
 *           example: "Pedido não encontrado."
 *     MultipleErrorResponseDTO:
 *       type: object
 *       properties:
 *         message:
 *           type: array
 *           description: Mensagens de erro
 *           items:
 *             type: string
 *           example: 
 *             - "valorTotal deve ser maior ou igual a zero."
 *     CreateOrderRequestDTO:
 *       type: object
 *       properties:
 *         numeroPedido:
 *           type: string
 *           description: ID do pedido
 *           required: true
 *           example: v10089015vdb-03
 *         valorTotal:
 *           type: number
 *           description: Valor total do pedido
 *           required: true
 *           example: 100200
 *         dataCriacao:
 *           type: string
 *           description: Data de criação do pedido
 *           format: date-time
 *           required: true
 *           example: 2023-07-19T12:24:11.529Z
 *         items:
 *           type: array
 *           description: Itens dentro do pedido
 *           required: true
 *           items:
 *             type: object
 *             properties:
 *               idItem:
 *                 type: string
 *                 description: ID do item dentro do pedido
 *                 required: true
 *                 example: "2434"
 *               quantidadeItem:
 *                 type: integer
 *                 description: Quantidade do item dentro do pedido
 *                 required: true
 *                 example: 11
 *               valorItem:
 *                 type: number
 *                 description: Preço do item dentro do pedido
 *                 required: true
 *                 example: 1000
 *     UpdateOrderRequestDTO:
 *       type: object
 *       properties:
 *         numeroPedido:
 *           type: string
 *           description: ID do pedido
 *           example: v10089015vdb-03
 *         valorTotal:
 *           type: number
 *           description: Valor total do pedido
 *           example: 100200
 *         dataCriacao:
 *           type: string
 *           description: Data de criação do pedido
 *           format: date-time
 *           example: 2023-07-19T12:24:11.529Z
 *         items:
 *           type: array
 *           description: Itens dentro do pedido
 *           items:
 *             type: object
 *             properties:
 *               idItem:
 *                 type: string
 *                 description: ID do item dentro do pedido
 *                 required: true
 *                 example: "2434"
 *               quantidadeItem:
 *                 type: integer
 *                 description: Quantidade do item dentro do pedido
 *                 required: true
 *                 example: 11
 *               valorItem:
 *                 type: number
 *                 description: Preço do item dentro do pedido
 *                 required: true
 *                 example: 1000
 */

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: Lista todos os pedidos cadastrados
 *     tags: [Order Endpoints]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               description: Array de pedidos cadastrados
 *               items:
 *                 $ref: '#/components/schemas/OrderResponseDTO'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponseDTO'
 */
router.get('/order/list', (...args) => { 
    console.log('GET /order/list')
    orderController.listOrders(...args) 
});

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Order Endpoints]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/CreateOrderRequestDTO'
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponseDTO'
 *       400:
 *         description: Requisição inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MultipleErrorResponseDTO'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponseDTO'
 */
router.post('/order', (...args) => { 
    console.log('POST /order')
    orderController.createOrder(...args) 
});

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: Retorna detalhes de um pedido pelo ID do pedido
 *     tags: [Order Endpoints]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Detalhes do pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponseDTO'
 *       404:
 *         description: Pedido não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundResponseDTO'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponseDTO'
 */
router.get('/order/:orderId', (...args) => { 
    console.log('GET /order/:orderId')
    orderController.getOrder(...args) 
});

/**
 * @swagger
 * /order/{orderId}:
 *   patch:
 *     summary: Atualiza um pedido
 *     tags: [Order Endpoints]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/CreateOrderRequestDTO'
 *     responses:
 *       201:
 *         description: Pedido atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponseDTO'
 *       400:
 *         description: Corpo da requisição inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MultipleErrorResponseDTO'
 *       404:
 *         description: Pedido com ID em path não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundResponseDTO'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponseDTO'
 */
router.patch('/order/:orderId', (...args) => { 
    console.log('PATCH /order/:orderId')
    orderController.updateOrder(...args) 
});

/**
 * @swagger
 * /order/{orderId}:
 *   delete:
 *     summary: Deleta um pedido pelo ID do pedido
 *     tags: [Order Endpoints]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido a ser deletado
 *     responses:
 *       200:
 *         description: Pedido deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponseDTO'
 *       404:
 *         description: Pedido não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundResponseDTO'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponseDTO'
 */
router.delete('/order/:orderId', (...args) => { 
    console.log('DELETE /order/:orderId')
    orderController.deleteOrder(...args) 
});

export default router;
