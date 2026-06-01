const express = require('express');
const router = express.Router();
const { 
    getVehicles, 
    createVehicle, 
    getVehiclesByCustomer,
    updateVehicle,
    deleteVehicle
} = require('../controllers/vehicleController');

router.route('/').get(getVehicles).post(createVehicle);
router.route('/:id').put(updateVehicle).delete(deleteVehicle);
router.route('/customer/:customerId').get(getVehiclesByCustomer);

module.exports = router;
