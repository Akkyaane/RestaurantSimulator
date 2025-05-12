const tableModel = require('../models/Table');

const getTables = async (req, res) => {
  try {
    const tables = await tableModel.getAllTables();
    res.status(200).json(tables);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des tables.' });
  }
};

const checkAvailability = async (req, res) => {
  const { numberOfPeople, reservationDate } = req.body;
  try {
    // Vérifier les tables disponibles
    const availableTables = await tableModel.getAvailableTables(numberOfPeople, reservationDate);
    
    // Si nous avons trouvé des tables, les envoyer
    if (availableTables.length > 0) {
      res.status(200).json(availableTables);
    } else {
      res.status(404).json({ error: 'Aucune combinaison de tables disponible pour cette réservation.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la vérification des disponibilités.' });
  }
};

const reserveTables = async (reservationId, availableTables) => {
  try {
    for (let table of availableTables) {
      await db.query('INSERT INTO reservation_tables (reservation_id, table_id) VALUES (?, ?)', [reservationId, table.id]);
    }
  } catch (err) {
    throw new Error('Erreur lors de la réservation des tables : ' + err.message);
  }
};


const addTable = async (req, res) => {
  const { seats } = req.body;
  try {
    const result = await tableModel.addTable(seats);
    res.status(201).json({ message: 'Table ajoutée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la table.' });
  }
};

module.exports = {
  getTables,
  checkAvailability,
  addTable,
};
