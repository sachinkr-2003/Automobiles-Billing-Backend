const Product = require('../models/Product');

// @desc    Get all services and parts
// @route   GET /api/products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ type: 1, itemName: 1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new service/part
// @route   POST /api/products
exports.createProduct = async (req, res) => {
    try {
        const { itemName, type, price, description, stock, minStock } = req.body;
        const newProduct = new Product({ 
            itemName, 
            type, 
            price, 
            description,
            stock: stock || 0,
            minStock: minStock || 5
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update service/part
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Service/Part not found' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete service/part
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Service/Part not found' });
        res.status(200).json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
