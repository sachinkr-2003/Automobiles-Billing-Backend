const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        itemName: { type: String, required: true },
        type: { type: String, enum: ['Service', 'Part'], required: true },
        price: { type: Number, required: true, default: 0 },
        description: { type: String },
        stock: { type: Number, default: 0 },
        minStock: { type: Number, default: 5 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
