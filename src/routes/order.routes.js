import express from 'express';
import orderController from '../controllers/order.controller.js';

const router = express.Router();

router.get('/order/list', (...args) => { 
    console.log('GET /order/list')
    orderController.listOrders(...args) 
});
router.post('/order', (...args) => { 
    console.log('POST /order')
    orderController.createOrder(...args) 
});
router.get('/order/:orderId', (...args) => { 
    console.log('GET /order/:orderId')
    orderController.getOrder(...args) 
});
router.patch('/order/:orderId', (...args) => { 
    console.log('PATCH /order/:orderId')
    orderController.updateOrder(...args) 
});
router.delete('/order/:orderId', (...args) => { 
    console.log('DELETE /order/:orderId')
    orderController.deleteOrder(...args) 
});

export default router;
