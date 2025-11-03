import express from "express"
import { createProduct, listProducts, getProduct, updateProduct, deleteProduct } from '../controllers/productController.js'
// import {protect} from '../middleware/auth.js'
// import {isAdmin} from '../middleware/role.js'
import multer from "multer"
const upload = multer({ dest: 'uploads/' })
const router = express.Router()

router.get("/", listProducts)
router.get("/:slug", getProduct)
router.post("/", protect, isAdmin, upload.array("images", 6), createProduct)
router.put("/:id", protect, isAdmin, updateProduct)
router.delete("/:id", protect, isAdmin, deleteProduct)

export default router;