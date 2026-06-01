const Vehicle = require('../models/Vehicle');

// @desc    Get all vehicles
// @route   GET /api/vehicles
exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().populate('customer', 'name phone');
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new vehicle
// @route   POST /api/vehicles
exports.createVehicle = async (req, res) => {
    try {
        const { customer, make, model, licensePlate, year } = req.body;
        const newVehicle = new Vehicle({ customer, make, model, licensePlate, year });
        const savedVehicle = await newVehicle.save();
        res.status(201).json(savedVehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get vehicles for a specific customer
// @route   GET /api/vehicles/customer/:customerId
exports.getVehiclesByCustomer = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ customer: req.params.customerId });
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update vehicle
// @route   PUT /api/vehicles/:id
exports.updateVehicle = async (req, res) => {
    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete vehicle
// @route   DELETE /api/vehicles/:id
exports.deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.status(200).json({ message: 'Vehicle removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
