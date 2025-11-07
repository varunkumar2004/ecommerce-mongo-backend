import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
import paymentRoutes from "./routes/payments.js";
import errorHandler from "./middleware/errorHandler.js";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import "./config/cloudinary.js"; // configure cloudinary
import "express-async-errors";

dotenv.config();

const app = express();
connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true,
}));

app.use(cookieParser());

// Stripe webhook needs raw body. We'll apply raw for that route specifically later.
// For other routes we use json/bodyParser.
app.use((req, res, next) => {
  if (req.originalUrl === "/api/payments/stripe/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// serve static uploads (optional)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// mount routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// For Stripe webhook: raw body
import rawBody from "raw-body";
app.post("/api/payments/stripe/webhook", (req, res, next) => {
  rawBody(req, {
    length: req.headers["content-length"],
    limit: "2mb",
    encoding: "utf8"
  }, function (err, string) {
    if (err) return next(err);
    req.rawBody = string;
    next();
  });
}, paymentRoutes);

// normal payments endpoint
app.use("/api/payments", paymentRoutes);

app.get("/", (req, res) => res.send("E-commerce API running"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
