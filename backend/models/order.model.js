import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerAddress: { type: String, required: true },
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    quantity: { type: Number, default: 1 },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
})

const Order = mongoose.model("Order", orderSchema);
export default Order;