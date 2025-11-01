import mongoose, { modelNames } from 'mongoose'
import bcrypt from 'bcryptjs'

const addressSchema = new mongoose.Schema({
    fullName: String,
    phone: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
})

const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        role: { type: String, enum: ["customer", "admin"], default: "customer" },
        addresses: [addressSchema],
        refreshToken: { type: String },
    }, { timestamps: true }
)

/**
 * Hashing password before saving
 */
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.comparePassword = async function(candidate) {
    if (!this.password) return false
    return bcrypt.compare(candidate, this.password)
}

export default mongoose.model('User', userSchema)