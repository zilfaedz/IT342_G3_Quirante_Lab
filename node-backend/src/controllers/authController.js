const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const { logAudit } = require('../utils/logger');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, barangayId } = req.body;

        // Check if user exists
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Only System Admins can assign roles other than Resident/Responder by default logic,
        // but for simplicity, we insert what is provided. In a real app, restrict this.
        const assignedRole = role || 'Resident';

        const userId = await UserModel.createUser(name, email, password, assignedRole, barangayId);
        await logAudit(userId, 'USER_REGISTERED');

        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            await logAudit(user.id, 'FAILED_LOGIN_ATTEMPT');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, role: user.role, barangayId: user.barangay_id, name: user.name },
            process.env.JWT_SECRET || 'fallback_secret_for_dev',
            { expiresIn: '1d' }
        );

        await logAudit(user.id, 'USER_LOGGED_IN');

        res.json({
            message: 'Logged in successfully',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                barangayId: user.barangay_id
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
