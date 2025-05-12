const express = require('express');
const db = require('./config/db');
const pool = db;

const app = express();
const authRoutes = require('./routes/authRoutes'); // Chemin vers le fichier ci-dessus
require('dotenv').config();

app.use(express.json());
// Permet d'ajouter les routes d'authentification
app.use(authRoutes);

(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Connexion à MySQL établie avec succès');

        const [rows] = await db.query('SELECT * FROM users');
        console.log('Utilisateurs présents dans la base :', rows);
        connection.release();
    } catch (err) {
        console.error('Erreur de connexion à la base MySQL :', err.message);
        process.exit(1);
    }
})();

app.get('/', (req, res) => {
    res.send('Bienvenue');
});



const menuRoutes = require('./routes/menuRoutes');
const tableRoutes = require('./routes/tableRoutes');

app.use('/menu', menuRoutes);
app.use('/tables', tableRoutes);

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

// app.get('/tasks', async (req, res) => {
//     try {
//     const [rows] = await pool.query('SELECT * FROM tasks');
//     res.json(rows); // 200 OK implicite
//     } catch (err) {
//     res.status(500).json({ error: err.message });
//     }
//     });

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

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});