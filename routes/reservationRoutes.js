const controllers = require('../controllers/reservationController.js');

function initReservations(app) {
    app.get('/reservations', controllers.getAllReservations)
    app.get('/my-reservations', controllers.getAllReservationsById)
    app.get('/my-reservation', controllers.getReservationById)
    app.post('/reservations', controllers.addReservation)
    app.put('/reservations/:id', controllers.updateReservation)
    app.delete('/reservations/:id', controllers.updateReservation)
    app.patch('/reservations/:id/validate', controllers.validateReservation)
}

module.exports = initReservations;