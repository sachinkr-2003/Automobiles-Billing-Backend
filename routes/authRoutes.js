const express = require('express');
const router = express.Router();
const { register, login, updateCredentials } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.put('/update', authMiddleware, updateCredentials);

module.exports = router;
