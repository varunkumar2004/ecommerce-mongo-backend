import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
    const { address } = req.body
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product")
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart empty" })

    let total = 0;

    const items = cart.items.map(i => {
        const p = i.product;
        const price = p.price;
        total += price * i.quantity;
        return { product: p._id, quantity: i.quantity, price };
    })

    const order = new Order({
        user: req.user._id,
        items,
        totalAmount: total,
        paymentStatus: "pending",
        address
    })

    await order.save();
    res.status(201).json({ orderId: order._id, totalAmount: total })
}

export const getOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate("items.product")
    res.json(orders)
}

export const getOrder = async (req, res) => {
    const order = await Order.findById(req.params.id).populate("items.product")
    if (!order) return res.status(404).json({ message: "Not found" })
    if (req.user.role !== "admin" && order.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Forbidden" })
    res.json(order)
}

export const updateOrderStatus = async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true })
    res.json(order)
}
