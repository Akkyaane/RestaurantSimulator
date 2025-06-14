const pool = require('../config/db.js');

const jwt = require('jsonwebtoken');/**
 * Verifies the JWT token from the Authorization header
 * @param {string} token - The JWT token to verify
 * @returns {object|null} - The decoded token payload or null if invalid
 */
async function getAllReservations() {
    const [rows] = await pool.query('SELECT * FROM reservations');
    return rows
}

async function getAllReservationsById(userId) {
    const [rows] = await pool.query('SELECT * FROM reservations WHERE user_id = ?', userId);
    return rows
}

async function getReservationById(reservation_Id,userId) {
    const [rows] = await pool.query('SELECT * FROM reservations WHERE id = ? and user_id = ?', [reservation_Id,userId]);
    return rows
}

async function addReservation(userId, numberPeople, date, statusId) {
    const [rows] = await pool.query(`INSERT INTO reservations (id, user_id, number_people, date, status_id) VALUES (?,?,?,?,?)`,
        [null, userId, numberPeople, date, statusId]);
    return rows
}

async function updateReservation(userId, numberPeople, date, statusId, reservationId) {
    const [rows] = await pool.query(
    'UPDATE reservations SET user_id = ?, number_people = ?, date = ?, status_id = ? WHERE id = ?',
    [userId, numberPeople, date, statusId, reservationId]
);
return rows;    return rows
}

async function deleteReservation(reservationId) {
    const statusId = 3;
    const [rows] = await pool.query(`UPDATE reservations SET status_id = ? WHERE id = ?`, [statusId, reservationId]);
    return rows
}

async function validateReservation(reservationId) {
    const statusId = 2;
    const [rows] = await pool.query(`UPDATE reservation SET status_id = ${statusId} WHERE id = ${reservationId})`);
    return rows
}


module.exports = {
    getAllReservations,
    getAllReservationsById,
    getReservationById,
    addReservation,
    updateReservation,
    deleteReservation,
    validateReservation
}



