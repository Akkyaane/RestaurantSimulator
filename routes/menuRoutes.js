const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const auth = require('../middleware/authMiddleware');
console.log('Middleware chargé :', typeof auth); // doit afficher "function"

router.get('/menu', auth ,menuController.getMenu);

module.exports = router;
