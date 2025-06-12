const express = require('express');
const router = express.Router();  
const tableController = require('../controllers/tableController');
const auth = require('../middleware/authMiddleware');
console.log('Middleware chargé :', typeof auth); // doit afficher "function"

// Route pour obtenir toutes les tables
router.get('/', tableController.getTables);

// Route pour vérifier la disponibilité des tables
router.post('/check-availability', tableController.checkAvailability);

// Route pour ajouter une table
router.post('/add', tableController.addTable);

module.exports = router;
