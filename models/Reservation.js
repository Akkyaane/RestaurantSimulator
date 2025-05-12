const pool = require('../config/db.js');
let rows = [];

async function getAllReservations() {
    return rows = await pool.query('SELECT * FROM reservations');
}

async function getAllReservationsById(userId) {
    return rows = await pool.query('SELECT * FROM reservations WHERE user_id = ?', userId);
}

async function AddReservation(userId, numberPeople, date, statusId) {
    return rows = await pool.query(`INSERT INTO reservations (id, user_id, number_people, date, status_id) VALUES (${userId}, ${numberPeople}, ${date}, ${statusId})`);
}

module.exports = {
    getAllReservations,
    getAllReservationsById,
};




