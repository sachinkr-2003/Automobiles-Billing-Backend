const mongoose = require('mongoose');

const billSchema = new mongoose.Schema(
    {
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
        vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
        items: [
            {
                service: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                itemName: { type: String }, // Snapshotted name
                quantity: { type: Number, required: true, default: 1 },
                price: { type: Number, required: true }, // Snapshotted price at the time of billing
            },
        ],
        totalAmount: { type: Number, required: true, default: 0 },
        status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
        paymentMethod: { type: String, enum: ['Unpaid', 'Cash', 'Online'], default: 'Unpaid' },
        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Bill', billSchema);
