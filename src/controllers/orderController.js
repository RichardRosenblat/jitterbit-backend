import Order from '../models/orderModel.js';

export default {
    createOrder: async (req, res) => {
        try {
            const { orderId, value, creationDate, items } = req.body;
            const newOrder = new Order({
                orderId,
                value,
                creationDate: new Date(creationDate),
                items
            });
            await newOrder.save();
            res.status(201).json(newOrder);
        } catch (err) {
            res.status(400).json({ message: err.message });
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

    listOrders: async (req, res) => {
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
