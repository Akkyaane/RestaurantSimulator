const models = require('../models/Reservation');

async function getAllReservations(req, res) {
    const userId = req.body["user_id"];

    if (userId === 1) {
        try {
            const rows = await models.getAllReservations();
            return res.json(rows);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    } else {
        return res.status(403).json({ error: "Accès non autorisé." });
    }
}

async function getAllReservationsById(req, res) {
    //Comparer avec la valeur de la session
    const userId = req.body["user_id"];

    if (userId) {
        try {
            const rows = await models.getAllReservationsById(userId);
            return res.json(rows);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    } else {
        return res.status(403).json({ error: "Accès non autorisé." });
    }
}

async function getReservationById(req, res) {
    //Comparer avec la valeur de la session
    const {userId, reservationId} = req.body;

    if (userId) {
        try {
            const rows = await models.getReservationById(reservationId);
            return res.json(rows);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    } else {
        return res.status(403).json({ error: "Accès non autorisé." });
    }
}

async function addReservation(req, res) {
    const userId = req.body["user_id"];

    if (userId) {
        const {numberPeople, date} = req.body;
        const statusId = 1; 

        //Vérifier que le créneau est disponible 
        //Séparer le nombre de personnes si trop
    
        try {
            const rows = await models.addReservation(userId, numberPeople, date, statusId);
            return res.json(rows);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    } else {
        return res.status(403).json({ error: "Accès non autorisé." });
    }
}

async function updateReservation(req, res) {
    const {userId, reservationId} = req.body;
    const reservation = models.getReservationById(reservationId)

    if (userId == reservation["user_id"]) {
        const {numberPeople, date} = req.body;

        //Vérifier que le créneau est disponible 
        //Séparer le nombre de personnes si trop
    
        try {
            const rows = await models.updateReservation(userId, numberPeople, date, statusId, reservationId);
            return res.json(rows);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    } else {
        return res.status(403).json({ error: "Accès non autorisé." });
    }
}

async function deleteReservation(req, res) {
    const {userId, reservationId, roleId} = req.body;
    const reservation = models.getReservationById(reservationId)

    if (userId == reservation["user_id"] || (roleId == 1)) {
        try {
            const rows = await models.deleteReservation(reservationId);
            return res.json(rows);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    } else {
        return res.status(403).json({ error: "Accès non autorisé." });
    }
}

async function validateReservation(req, res) {
    const {reservationId, roleId} = req.body;
    
    if (roleId == 1) {
        try {
            const rows = await models.validateReservation(reservationId);
            return res.json(rows);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    } else {
        return res.status(403).json({ error: "Accès non autorisé." });
    }
}

module.exports = {
    getAllReservations,
    getAllReservationsById,
    getReservationById,
    addReservation,
    updateReservation,
    deleteReservation,
    validateReservation,
};
