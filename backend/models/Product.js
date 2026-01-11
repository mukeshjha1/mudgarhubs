const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    shortDescription: String,
    price: { type: Number, required: true },
    salePrice: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    images: [String],
    weight: String,
    material: String,
    dimensions: String,
    stock: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    freeWorkout: { type: Boolean, default: true },
    rating: { type: Number, default: 5 },
    reviews: { type: Number, default: 0 },
    specifications: [{
        label: String,
        value: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
