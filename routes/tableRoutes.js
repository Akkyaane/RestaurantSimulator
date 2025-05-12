const express = require('express');
const router = express.Router();  
const tableController = require('../controllers/tableController');

// Route pour obtenir toutes les tables
router.get('/', tableController.getTables);

// Route pour vérifier la disponibilité des tables
router.post('/check-availability', tableController.checkAvailability);

// Route pour ajouter une table
router.post('/add', tableController.addTable);

module.exports = router;
