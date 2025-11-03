import express from "express"
import { getCart, addToCart, updateCartItem, removeCartItem } from "../controllers/cartController.js"
import { protect } from "../middleware/auth.js"
const router = express.Router()

router.use(protect)
router.get("/", getCart)
router.post("/add", addToCart)
router.put("/item/:itemId", updateCartItem)
router.delete("/item/:itemId", removeCartItem)

export default router;
