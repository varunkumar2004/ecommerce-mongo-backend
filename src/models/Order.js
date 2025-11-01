import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number
})

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        items: [orderItemSchema],
        totalAmount: Number,
        paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
        orderStatus: { type: String, enum: ["pending", "processing", "shipped", "delivered", "cancelled"], default: "pending" },
        address: Object,
        paymentId: String,
        stripePaymentIntentId: String
    },
    { timestamps: true }
)

export default mongoose.model('Order', orderSchema)