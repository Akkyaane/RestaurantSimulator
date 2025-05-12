const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const {Email,Password,FirstName,LastName,Phone,RoleId} = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [Email]);
        if (rows.length > 0) {
            return res.status(409).json({ message: 'Utilisateur déjà existant' });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        await pool.query('INSERT INTO users (email,password_hash,fname,lname,phone,role_id) VALUES (?,?,?,?,?,?)',
            [Email,hashedPassword,FirstName,LastName,Phone,RoleId]);

        res.status(201).json({ message: 'Utilisateur créé' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

const login = async (req, res) => {
    const {Email, Password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [Email]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(Password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15min' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

module.exports = { signup, login };