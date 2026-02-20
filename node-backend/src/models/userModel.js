const pool = require('../config/database');
const bcrypt = require('bcrypt');

const UserModel = {
    async createUser(name, email, password, role = 'Resident', barangayId = null) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `
            INSERT INTO users (name, email, password_hash, role, barangay_id)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await pool.execute(query, [name, email, hashedPassword, role, barangayId]);
        return result.insertId;
    },

    async findByEmail(email) {
        const query = `SELECT * FROM users WHERE email = ?`;
        const [rows] = await pool.execute(query, [email]);
        return rows[0];
    },

    async findById(id) {
        const query = `SELECT id, name, email, role, barangay_id, created_at FROM users WHERE id = ?`;
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    },

    async getAllUsers() {
        // System admin feature
        const query = `SELECT id, name, email, role, barangay_id, created_at FROM users`;
        const [rows] = await pool.execute(query);
        return rows;
    }
};

module.exports = UserModel;
