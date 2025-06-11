const pool = require("../config/db");

async function getUserById(userId) {
    const [rows] = await pool.query('SELECT * FROM users where id = ?', [userId]);
    return rows
}

async function getUserByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users where email = ?', [email]);
    return rows
}
async function getAllUsers() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
}



module.exports = {
    getUserByEmail,
    getAllUsers,
    getUserById
}
