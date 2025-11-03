import express from "express"
import { createOrder, getOrders, getOrder, updateOrderStatus } from "../controllers/orderController.js"
import { protect } from "../middleware/auth.js"
import { isAdmin } from "../middleware/role.js"
const router = express.Router()

router.use(protect)
router.post("/create", createOrder)
router.get("/", getOrders)
router.get("/:id", getOrder)

router.put("/:id/status", protect, isAdmin, updateOrderStatus)

export default router;
