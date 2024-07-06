import Order from '../models/order.model.js';
import { validateCreateOrderValues } from '../validators/order.validator.js';
import { mapOrderToModelData, mapOrderToResponse } from '../mappers/order.mapper.js';

export default {
    createOrder: async (req, res) => {
        try {
            const body = req.body;

            const errors = validateCreateOrderValues(body);

            if (body.numeroPedido) {
                const order = await Order.findOne({ orderId: body.numeroPedido });
                if (order) {
                    errors.push('numeroPedido já cadastrado');
                }
            }

            if (errors.length) {
                return res.status(400).json({ message: errors });
            }

            const newOrder = new Order(
                mapOrderToModelData(body)
            );

            await newOrder.save();
            res.status(201).json(mapOrderToResponse(newOrder));
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getOrder: async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const order = await Order.findOne({ orderId });
            if (!order) {
                return res.status(404).json({ message: 'Order not found.' });
            }
            res.json(order);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    listOrders: async (_req, res) => {
        try {
            const orders = await Order.find();
            res.json(orders);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    updateOrder: async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const { value, creationDate, items } = req.body;
            const updatedOrder = await Order.findOneAndUpdate(
                { orderId },
                { value, creationDate, items },
                { new: true }
            );
            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found.' });
            }
            res.json(updatedOrder);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    deleteOrder: async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const deletedOrder = await Order.findOneAndDelete({ orderId });
            if (!deletedOrder) {
                return res.status(404).json({ message: 'Order not found.' });
            }
            res.json({ message: 'Order deleted successfully.' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
}
