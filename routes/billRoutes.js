const express = require('express');
const router = express.Router();
const { 
    getBills, 
    createBill, 
    getBillById, 
    updateBillStatus,
    updateBill,
    deleteBill
} = require('../controllers/billController');

router.route('/').get(getBills).post(createBill);
router.route('/:id').get(getBillById).put(updateBill).delete(deleteBill);
router.route('/:id/status').put(updateBillStatus);

module.exports = router;
