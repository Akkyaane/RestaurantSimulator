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


// app.post('/tasks', async (req, res) => {
//     try {
//         const { title , description } = req.body;
//         const [result] = await pool.query(
//             'INSERT INTO tasks (title, description) VALUES (?, ?)',
//             [title, description]
//         );
//         res.status(201).json({
//             id: result.insertId,
//             title,
//             description,
//             status: 'todo'
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
    
// });

// app.get('/tasks/:id', async (req, res) => {
//     try {
//     const { id } = req.params;
//     const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
//     if (rows.length === 0) {
//     return res.status(404).json({ error: 'Tâche non trouvée' });
//     }
//     res.json(rows[0]);
//     } catch (err) {
//     res.status(500).json({ error: err.message });
//     }
//     });

// app.put('/tasks/:id', async (req, res) => {
//     try {
//     const { id } = req.params;
//     const { title, description, status } = req.body;
//     const [result] = await pool.query(
//     'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
//     [title, description, status, id]
//     );
//     if (result.affectedRows === 0) {
//     return res.status(404).json({ error: 'Tâche non trouvée' });
//     }
//     res.json({ id, title, description, status });
//     } catch (err) {
//     res.status(500).json({ error: err.message });
//     }
//     });

// app.delete('/tasks/:id', async (req, res) => {
//     try {
//     const { id } = req.params;
//     const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
//     if (result.affectedRows === 0) {
//     return res.status(404).json({ error: 'Tâche non trouvée' });
//     }
//     res.sendStatus(204); // No Content
//     } catch (err) {
//     res.status(500).json({ error: err.message });
//     }
//     });

