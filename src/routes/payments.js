import express from "express"
import { createPaymentIntent, stripeWebhook } from "../controllers/paymentController.js"
import { protect } from "../middleware/auth.js"
const router = express.Router()

router.post("/stripe/create-intent", protect, createPaymentIntent)

router.post("/stripe/webhook", stripeWebhook)

export default router;