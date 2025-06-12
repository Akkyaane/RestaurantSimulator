const controllers = require('../controllers/reservationController.js');
const auth = require('../middleware/authMiddleware');
console.log('Middleware chargé :', typeof auth); // doit afficher "function"
function initReservations(app) {
    app.get('/reservations', auth, controllers.getAllReservations)
    app.get('/my-reservations', auth, controllers.getAllReservationsById)
    app.get('/my-reservation', auth, controllers.getReservationById)
    app.post('/reservations', auth, controllers.addReservation)
    app.put('/reservations/:id', auth, controllers.updateReservation)
    app.delete('/reservations/:id', auth, controllers.deleteReservation)
    app.patch('/reservations/:id/validate', auth, controllers.validateReservation)
}

module.exports = initReservations;