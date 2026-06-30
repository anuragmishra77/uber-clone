const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
    '/register',
    [
        body('fullname')
            .isLength({ min: 3 })
            .withMessage('Full name must be at least 3 characters long'),
        body('email')
            .isEmail()
            .withMessage('Please provide a valid email'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
        body('vehicle')
            .notEmpty()
            .withMessage('Vehicle information is required'),
        body('vehicle.color')
            .notEmpty()
            .withMessage('Vehicle color is required'),
        body('vehicle.licensePlate')
            .notEmpty()
            .withMessage('Vehicle license plate is required'),
        body('vehicle.capacity')
            .isInt({ min: 1 })
            .withMessage('Vehicle capacity must be at least 1'),
        body('vehicle.type')
            .isIn(['car', 'auto', 'bike'])
            .withMessage('Vehicle type must be either car, auto, or bike')
    ],
    captainController.registerCaptain
);

router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .withMessage('Please provide a valid email'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
    ],
    captainController.loginCaptain
);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);
router.post('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;