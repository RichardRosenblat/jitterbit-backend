import mongoose from 'mongoose';

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

const Order = mongoose.model('Order', OrderSchema);

export default Order;
