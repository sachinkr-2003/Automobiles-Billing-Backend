const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
    {
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
        make: { type: String, required: true }, // e.g., Honda, Maruti
        model: { type: String, required: true }, // e.g., City, Swift
        licensePlate: { type: String, required: true, unique: true },
        year: { type: Number },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
