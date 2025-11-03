import Product from "../models/Product.js"
import { slugify } from "../utils/slugify.js"
import cloudinary from "../config/cloudinary.js"

export const createProduct = async (req, res) => {
  const { title, description, price, category, stock } = req.body
  const slug = slugify(title)
  const existing = await Product.findOne({ slug })
  if (existing) return res.status(400).json({ message: "Product with same slug exists" })

  const images = []
  if (req.files && req.files.length) {
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, { folder: "ecommerce" })
      images.push({ url: result.secure_url, public_id: result.public_id })
    }
  }

  const product = new Product({ title, slug, description, price, category, stock, images })
  await product.save()
  res.status(201).json(product)
}

export const listProducts = async (req, res) => {
  const { page = 1, limit = 20, q, category } = req.query
  const filter = { isActive: true }
  if (q) filter.$text = { $search: q } // ensure text index on title/description (create later)
  if (category) filter.category = category
  const products = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .lean()

  res.json(products)
}

export const getProduct = async (req, res) => {
  const { slug } = req.params
  const product = await Product.findOne({ slug }).populate("ratings.user", "name email")
  if (!product) return res.status(404).json({ message: "Not found" })
  res.json(product)
}

export const updateProduct = async (req, res) => {
  const { id } = req.params
  const updates = req.body
  const product = await Product.findByIdAndUpdate(id, updates, { new: true })
  res.json(product)
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params
  // soft delete
  await Product.findByIdAndUpdate(id, { isActive: false })
  res.json({ message: "Product disabled" })
}