const express = require('express');
const db = require('./config/db.js');

const reservationRoutes = require('./routes/reservationRoutes.js')

const app = express();

app.use(express.json());

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

reservationRoutes(app);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});