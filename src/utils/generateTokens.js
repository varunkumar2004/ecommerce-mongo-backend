import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

/**
 * Generates a JWT access token for the given user.
 */
export const generateAccessToken = (user) => {
    return jwt.sign(
        { sub: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m" }
    )
}

/**
 * Generates a JWT refresh token for the given user.
 */
export const generateRefreshToken = (user) => {
    return jwt.sign(
        { sub: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES || "7d" }
    )
}
