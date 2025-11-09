# 🛍️ E-Commerce Backend (Node.js + Express + MongoDB)

A complete backend API for an **E-commerce platform**, built using **Node.js**, **Express**, and **MongoDB (Mongoose)**.  
It includes user authentication, product management, cart, order processing, and Cloudinary-based image uploads — with optional Stripe integration for secure payments.

---

## 🚀 Features

### 👤 Authentication
- Register and login using email & password.
- JWT-based authentication with access + refresh tokens.
- Role-based access control (Customer, Admin).

### 🛒 Products
- CRUD operations for products (Admin only).
- Product images uploaded to **Cloudinary**.
- Product search, filtering, and pagination.
- Supports categories, stock management, and ratings.

### 🧺 Cart
- Add, update, and remove products from cart.
- Automatically calculates totals.
- Each user maintains their own cart.

### 📦 Orders
- Create orders from the cart.
- Track order status (`pending`, `processing`, `shipped`, `delivered`, `cancelled`).
- Manage orders from the admin dashboard.

### 💳 Payments (Optional)
- Stripe integration for secure online payments.
- Webhook listener to verify payment success.
- Currently **disabled by default** — can be enabled later.

### ☁️ Cloudinary Integration
- Upload and manage product images on Cloudinary.
- Returns secure URLs for frontend display.

### 🧠 Security
- Passwords hashed using bcrypt.
- Environment-based configuration via `.env`.
- Rate limiting and input validation (can be added easily).

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Backend Framework** | Express.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT (Access + Refresh tokens) |
| **Image Hosting** | Cloudinary |
| **Payments (optional)** | Stripe |
| **Environment Config** | dotenv |
| **Dev Tooling** | nodemon |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/varunkumar2004/ecommerce-mongo-backend.git
cd ecommerce-mongo-backend
