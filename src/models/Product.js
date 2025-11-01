import mongoose from "mongoose"

const ratingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    comment: String
})

const imageSchema = new mongoose.Schema({
    url: String,
    public_id: String
})

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: String,
        price: { type: Number, required: true },
        currency: { type: String, default: "INR" },
        images: [imageSchema],
        category: String,
        stock: { type: Number, default: 0 },
        sold: { type: Number, default: 0 },
        ratings: [ratingSchema],
        averageRating: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true }
    }, { timestamps: true }
);

export default mongoose.model('Product', productSchema)