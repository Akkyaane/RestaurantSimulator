const express = require('express');
const db = require('./config/db');
const pool = db;
const cors = require('cors');

const app = express();
const authRoutes = require('./routes/authRoutes'); // Chemin vers le fichier ci-dessus
const reservationRoutes = require('./routes/reservationRoutes.js')
require('dotenv').config();

const allowedOrigins = [/^http:\/\/localhost:\d+$/];


app.use(express.json());

//  Permet de gérer les requêtes CORS
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.some(regex => regex.test(origin))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
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

app.use('/tables', tableRoutes);

app.use(menuRoutes);
reservationRoutes(app);


const port = 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});