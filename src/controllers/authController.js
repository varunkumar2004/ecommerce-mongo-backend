import User from "../models/User.js"
import { generateAccessToken, generateRefreshToken } from '../utils/generateTokens.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const register = async (req, res) => {
    const { name, email, password } = req.body
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'email already registered' })
    const user = new User({ name, email, password })
    await user.save()
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    user.refreshToken = refreshToken
    await user.save()
    res.status(201).json({ user: { id: user._id, email: user.email, name: user.name }, accessToken, refreshToken })
}

export const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'invalid credentials' })
    const ok = await user.comparePassword(password)
    if (!ok) return res.status(400).json({ message: 'invalid credentials' })
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    user.refreshToken = refreshToken
    await user.save()
    res.json({ accessToken, refreshToken, user: { id: user._id, email: user.email, name: user.name, role: user.role } })
}

export const refreshToken = async (req, res, next) => {
    const { token } = req.body
    if (!token) return res.status(400).json({ message: 'No refresh token provided' })
    try {
        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        const user = await User.findById(payload.sub)
        if (!user) return res.status(400).json({ message: "Invalid token" })
        if (user.refreshToken !== token) return res.status(400).json({ message: "Token revoked" })
        const newAccess = generateAccessToken(user)
        const newRefresh = generateRefreshToken(user)
        user.refreshToken = newRefresh
        await user.save()
        res.json({ accessToken: newAccess, refreshToken: newRefresh })
    } catch (err) {
        res.status(401).json({ message: 'Invalid refresh token', error: err.message })
    }
}

export const logout = async (req, res, next) => {
    const { token } = req.body
    if (!token) return res.status(400).json({ message: 'No Token' })
    try {
        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        const user = await User.findById(payload.sub)
        if (user) {
            user.refreshToken = null
            await user.save()
        }
        res.json({ message: 'Logged out' })
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' })
    }
}
