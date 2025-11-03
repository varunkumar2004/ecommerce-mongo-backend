import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product")
    if (!cart) return res.json({ items: [] })
    res.json(cart)
}

export const addToCart = async (req, res) => {
    const { productId, quantity = 1 } = req.body
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: "Product not found" })

    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) cart = new Cart({ user: req.user._id, items: [] })

    const idx = cart.items.findIndex(i => i.product.toString() === productId)
    if (idx > -1) {
        cart.items[idx].quantity += quantity
    } else {
        cart.items.push({ product: productId, quantity })
    }
    await cart.save()
    res.json(cart)
};

export const updateCartItem = async (req, res) => {
    const { itemId } = req.params
    const { quantity } = req.body
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return res.status(404).json({ message: "Cart not found" })
    const item = cart.items.id(itemId)
    if (!item) return res.status(404).json({ message: "Item not found" })
    item.quantity = quantity
    await cart.save()
    res.json(cart)
};

export const removeCartItem = async (req, res) => {
    const { itemId } = req.params
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return res.status(404).json({ message: "Cart not found" })
    cart.items.id(itemId).remove()
    await cart.save()
    res.json(cart)
};
