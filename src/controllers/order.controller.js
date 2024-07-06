import Order from '../models/order.model.js';
import { validateCreateOrderValues, validateUpdateOrderValues } from '../validators/order.validator.js';
import { mapOrderToModelData, mapOrderToResponse } from '../mappers/order.mapper.js';

// Funções de controle de pedidos
export default {
    createOrder: async (req, res) => {
        try {
            const { body } = req;

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
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }
            res.json(mapOrderToResponse(order));
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    listOrders: async (_req, res) => {
        try {
            const orders = await Order.find();
            res.json(orders.map(order => mapOrderToResponse(order)));
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    updateOrder: async (req, res) => {
        try {
            const { orderId } = req.params;
            const { body } = req;

            const errors = validateUpdateOrderValues(body);

            if (orderId) {
                const orderToChange = await Order.findOne({ orderId });
                if (!orderToChange) {
                    errors.push('Pedido não encontrado');
                } else if (orderId !== body.numeroPedido) {
                    const orderWithNewId = await Order.findOne({ orderId: body.numeroPedido });
                    if (orderWithNewId) {
                        errors.push('novo numeroPedido já está cadastrado');
                    }
                }
            }

            if (errors.length) {
                return res.status(400).json({ message: errors });
            }

            const updatedOrder = await Order.findOneAndUpdate(
                { orderId },
                mapOrderToModelData(body), { new: true }
            );

            if (!updatedOrder) {
                return res.status(404).json({ message: 'Pedido não enontrado' });
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
                return res.status(404).json({ message: 'Pedido não enontrado' });
            }
            res.status(200).json(mapOrderToResponse(deletedOrder));
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
}
