// import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });

// create payment intent for order
// export const createPaymentIntent = async (req, res) => {
//     const { orderId } = req.body;
//     const order = await Order.findById(orderId).populate("items.product");
//     if (!order) return res.status(404).json({ message: "Order not found" });
//     if (order.paymentStatus === "paid") return res.status(400).json({ message: "Already paid" });

//     const amount = Math.round(order.totalAmount * 100); // in cents/paise (Stripe uses smallest currency unit)
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount,
//         currency: "inr",
//         metadata: { orderId: order._id.toString() },
//     });

//     // attach stripe intent id to order for later
//     order.stripePaymentIntentId = paymentIntent.id;
//     await order.save();

//     res.json({ clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id });
// };

// // Stripe webhook to listen for payment success
// export const stripeWebhook = async (req, res) => {
//     const sig = req.headers["stripe-signature"];
//     let event;
//     try {
//         event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
//     } catch (err) {
//         console.error("Webhook signature verification failed", err.message);
//         return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     if (event.type === "payment_intent.succeeded") {
//         const intent = event.data.object;
//         const orderId = intent.metadata.orderId;
//         // mark order paid:
//         const order = await Order.findById(orderId);
//         if (order) {
//             order.paymentStatus = "paid";
//             order.paymentId = intent.id;
//             order.orderStatus = "processing";
//             await order.save();
//             // decrement stock of each product:
//             for (const it of order.items) {
//                 await Product.findByIdAndUpdate(it.product, { $inc: { stock: -it.quantity, sold: it.quantity } });
//             }
//             // optionally send email, create shipment job, etc.
//         }
//     }

//     res.json({ received: true });
// };

// controllers/paymentController.js
export const createPaymentIntent = async (req, res) => {
  // Instead of calling Stripe, just simulate a payment
  const { orderId } = req.body;
  res.json({
    message: "💳 Payment temporarily disabled.",
    orderId,
    mockPaymentStatus: "success",
  });
};

// Temporary webhook mock
export const stripeWebhook = async (req, res) => {
  res.json({ received: true, note: "Payment system paused for now" });
};
