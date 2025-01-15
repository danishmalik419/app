const express = require('express');
const { register, login, forgotPassword, resetPassword, verifyEmail  } = require('../controllers/authController');
const validationMiddleware  = require('../middleware/validationMiddleware');
const { registerValidation, loginValidation } = require('../validations/authValidation');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', validationMiddleware(registerValidation), register);
router.post('/login', validationMiddleware(loginValidation), login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/verify-email/:token', verifyEmail);


module.exports = router;
