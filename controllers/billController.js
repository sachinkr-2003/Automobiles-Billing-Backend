const Bill = require('../models/Bill');

// @desc    Get all bills
// @route   GET /api/bills
exports.getBills = async (req, res) => {
    try {
        const bills = await Bill.find()
            .populate('customer', 'name phone')
            .populate('vehicle', 'make model licensePlate')
            .sort({ date: -1 });
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new bill
// @route   POST /api/bills
exports.createBill = async (req, res) => {
    try {
        const { customer, vehicle, items, status, paymentMethod } = req.body;
        
        // Calculate total amount if not provided, or verify it
        const totalAmount = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

        const newBill = new Bill({
            customer,
            vehicle,
            items,
            totalAmount,
            status: status || 'Pending',
            paymentMethod: paymentMethod || 'Unpaid'
        });

        const savedBill = await newBill.save();
        const populatedBill = await Bill.findById(savedBill._id)
            .populate('customer', 'name phone')
            .populate('vehicle', 'make model licensePlate')
            .populate('items.service');
            
        res.status(201).json(populatedBill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get single bill by ID
// @route   GET /api/bills/:id
exports.getBillById = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id)
            .populate('customer')
            .populate('vehicle')
            .populate('items.service');
            
        if (!bill) return res.status(404).json({ message: 'Bill not found' });
        res.status(200).json(bill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update bill status (e.g. mark as Paid)
// @route   PUT /api/bills/:id/status
exports.updateBillStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const bill = await Bill.findByIdAndUpdate(req.params.id, { status }, { new: true });
        
        if (!bill) return res.status(404).json({ message: 'Bill not found' });
        res.status(200).json(bill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a bill
// @route   PUT /api/bills/:id
exports.updateBill = async (req, res) => {
    try {
        const { customer, vehicle, items, status, paymentMethod } = req.body;
        const totalAmount = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

        const updatedBill = await Bill.findByIdAndUpdate(req.params.id, {
            customer,
            vehicle,
            items,
            totalAmount,
            status: status || 'Pending',
            paymentMethod: paymentMethod || 'Unpaid'
        }, { new: true })
            .populate('customer', 'name phone')
            .populate('vehicle', 'make model licensePlate')
            .populate('items.service');

        if (!updatedBill) return res.status(404).json({ message: 'Bill not found' });
        res.status(200).json(updatedBill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a bill
// @route   DELETE /api/bills/:id
exports.deleteBill = async (req, res) => {
    try {
        const bill = await Bill.findByIdAndDelete(req.params.id);
        if (!bill) return res.status(404).json({ message: 'Bill not found' });
        res.status(200).json({ message: 'Bill removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
