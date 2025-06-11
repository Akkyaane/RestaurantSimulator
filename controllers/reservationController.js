const models = require('../models/Reservation');
const superUser = require('../models/User')

async function getAllReservations(req, res) {
    const user_id = req.headers["user_id"];

    // Vérifier que l'utilisateur est admin (user_id = 1)
    const isAdmin = await superUser.getUserById(user_id);

    if (isAdmin[0].role_id === 1) {
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
    const user_id = req.headers["user_id"];

    if (parseInt(user_id) === 1) {
        try {
            const rows = await models.getAllReservationsById(user_id);
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
    const {user_id, reservation_id} = req.headers;

    if (parseInt(user_id) === 1) {
        try {
            const rows = await models.getReservationById(reservation_id);
            return res.json(rows);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    } else {
        return res.status(403).json({ error: "Accès non autorisé." });
    }
}

async function addReservation(req, res) {
    const user_id = req.body["user_id"];

    if (parseInt(user_id) === 1) {
        const {numberPeople} = req.body;
        const { date } = req.body;
        // Mise en forme de la date pour correspondre au format SQL
        const formattedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');

        const statusId = 1; 

        //Vérifier que le créneau est disponible 
        //Séparer le nombre de personnes si trop
    
        try {
            const rows = await models.addReservation(user_id, numberPeople, formattedDate, statusId);
            return res.json(rows);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    } else {
        return res.status(403).json({ error: "Accès non autorisé." });
    }
}

async function updateReservation(req, res) {
    const {user_id, reservation_id,status_id} = req.body;
    const reservation = await models.getReservationById(reservation_id)

    if (parseInt(user_id) === reservation[0].user_id) {
        const {numberPeople} = req.body;
        const { date } = req.body;
        // Mise en forme de la date pour correspondre au format SQL
        const formattedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
        //Vérifier que le créneau est disponible
        //Séparer le nombre de personnes si trop
    
        try {
            const rows = await models.updateReservation(user_id, numberPeople, formattedDate, status_id, reservation_id);
            return res.json(rows);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    } else {
        return res.status(403).json({ error: "Accès non autorisé." });
    }
}

async function deleteReservation(req, res) {
    const {user_id, reservation_id} = req.headers;
    const reservation = await models.getReservationById(reservation_id)

    if (parseInt(user_id) == reservation[0].user_id || (parseInt(user_id) == 1)) {
        try {
            const rows = await models.deleteReservation(reservation_id);
            return res.json(rows);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    } else {
        return res.status(403).json({ error: "Accès non autorisé." });
    }
}

async function validateReservation(req, res) {
    const {reservation_id, roleId} = req.body;
    
    if (parseInt(user_id) == 1) {
        try {
            const rows = await models.validateReservation(reservation_id);
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
