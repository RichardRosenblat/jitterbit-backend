import express from 'express';
import orderController from '../controllers/orderController.js';

const router = express.Router();

router.post('/order', orderController.createOrder);
router.get('/order/:orderId', orderController.getOrder);
router.get('/order/list', orderController.listOrders);
router.put('/order/:orderId', orderController.updateOrder);
router.delete('/order/:orderId', orderController.deleteOrder);

export default router;
