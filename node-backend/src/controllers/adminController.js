const UserModel = require('../models/userModel');
const { logAudit } = require('../utils/logger');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers();
        await logAudit(req.user.id, 'VIEWED_ALL_USERS_DB');
        res.json(users);
    } catch (error) {
        console.error('Get All Users Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.assignRole = async (req, res) => {
    try {
        // Mock function to update role (requires model extension)
        const { userId, role } = req.body;

        // Example query logic could be implemented in UserModel
        // await UserModel.updateUserRole(userId, role);

        await logAudit(req.user.id, `ASSIGNED_ROLE_${role}_TO_USER`, userId);
        res.json({ message: `Role ${role} assigned successfully to user ${userId}` });
    } catch (error) {
        console.error('Assign Role Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
