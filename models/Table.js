const db = require('../config/db');

// Fonction pour obtenir toutes les tables
const getAllTables = async () => {
    try {
        const [results] = await db.query('SELECT * FROM tables');
        return results;
    } catch (err) {
        throw new Error('Erreur lors de la récupération des tables : ' + err.message);
    }
};
const getAvailableTables = async (numberOfPeople, reservationDate) => {
    try {
        // Récupérer toutes les tables disponibles (ceux qui peuvent accueillir assez de personnes)
        const [results] = await db.query(`
            SELECT t.id, t.seats
                FROM tables t
                WHERE t.seats >= ? AND NOT EXISTS (
                    SELECT 1 FROM reservation_tables rt
                JOIN reservations r ON rt.reservation_id = r.id
                WHERE rt.table_id = t.id
                AND r.date = ?
                )`, [numberOfPeople, reservationDate]);

        // Si une seule table suffit
        if (results.length > 0) {
            const suitableTable = results.filter(table => table.seats >= numberOfPeople);
            if (suitableTable.length > 0) {
                return [suitableTable]; // Retourner la table qui correspond
            }
        }

        // Si une combinaison de tables est nécessaire
        const availableTables = [];
        let remainingPeople = numberOfPeople;

        // Trier les tables par taille décroissante
        const sortedTables = results.sort((a, b) => b.seats - a.seats);

        for (const table of sortedTables) {
            if (remainingPeople <= 0) break;
            if (table.seats <= remainingPeople) {
                availableTables.push(table); // Ajouter cette table à la combinaison
                remainingPeople -= table.seats; // Réduire le nombre de personnes restantes
            }
        }

        // Si nous avons trouvé une combinaison de tables
        if (remainingPeople <= 0) {
            return availableTables;
        } else {
            throw new Error('Aucune combinaison de tables disponible.');
        }

    } catch (err) {
        throw new Error('Erreur lors de la vérification des disponibilités : ' + err.message);
    }
};

module.exports = {
    getAllTables,
    getAvailableTables,
};