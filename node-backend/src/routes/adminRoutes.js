const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const adminController = require('../controllers/adminController');

// Admin routes require auth and System Admin role
router.use(verifyToken);
router.use(authorizeRoles('System Admin'));

// Get all users in the system
router.get('/users', adminController.getAllUsers);

// Assign a role to a user
router.post('/assign-role', adminController.assignRole);

module.exports = router;
