import mongoose from 'mongoose';

// Criação do schema de pedidos
const OrderSchema = new mongoose.Schema({
  orderId: String,
  value: Number,
  creationDate: Date,
  items: [{
    productId: Number,
    quantity: Number,
    price: Number
  }]
});

// Criação do modelo de pedidos
const Order = mongoose.model('Order', OrderSchema);

export default Order;
