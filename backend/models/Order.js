const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, unique: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        quantity: Number,
        image: String
    }],
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: String,
        address: String,
        city: String,
        state: String,
        pincode: String
    },
    subtotal: { type: Number, required: true },
    shipping: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: { type: String, default: 'COD' },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
    status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    notes: String
}, { timestamps: true });

orderSchema.pre('save', async function (next) {
    if (!this.orderNumber) {
        this.orderNumber = 'MH' + Date.now().toString().slice(-8);
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);
