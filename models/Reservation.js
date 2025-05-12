const pool = require('../config/db.js');

async function getAllReservations() {
    const [rows] = await pool.query('SELECT * FROM reservations');
    return rows
}

async function getAllReservationsById(userId) {
    const [rows] = await pool.query('SELECT * FROM reservations WHERE user_id = ?', userId);
    return rows
}

async function getReservationById(reservationId) {
    const [rows] = await pool.query('SELECT * FROM reservations WHERE id = ?', reservationId);
    return rows
}

async function addReservation(userId, numberPeople, date, statusId) {
    const [rows] = await pool.query(`INSERT INTO reservations (id, user_id, number_people, date, status_id) VALUES (${userId}, ${numberPeople}, ${date}, ${statusId})`);
    return rows
}

async function updateReservation(userId, numberPeople, date, statusId, reservationId) {
    const [rows] = await pool.query(`UPDATE reservation SET user_id = ${userId}, numberPeople = ${numberPeople}, date = ${date}, status_id = ${statusId} WHERE id = ${reservationId})`);
    return rows
}

async function deleteReservation(reservationId) {
    const statusId = 3;
    const [rows] = await pool.query(`UPDATE reservation SET status_id = ${statusId} WHERE id = ${reservationId})`);
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
    validateReservation,
}





