const models = require('../models/Reservation');

async function getAllReservations(req, res) {
    try {
        const rows = await models.getAllReservations();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getAllReservationsById(req, res) {
    try {
        const userId = req.user.id;
        const rows = await models.getAllReservationsById(userId);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllReservations,
    getAllReservationsById,
};
