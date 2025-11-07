import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User.js"

dotenv.config()

export const protect = async (req, res, next) => {
    try {
        let token = null
        const authHeader = req.headers.authorization
        
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1]
        } else if (req.cookies && req.cookies.token) {
            token = req.cookies.token
        }

        if (!token) return res.status(401).json({ message: "Not authorized, no token" })

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.sub).select("-password")

        if (!user) return res.status(401).json({ message: "Not authorized, user not found" })
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: "Not authorized", error: error.message })
    }
}