const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const superUser = require('../models/User');

const signup = async (req, res) => {
    const {email,password,firstName,lastName,phone} = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({ message: 'Utilisateur déjà existant' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (email,password_hash,fname,lname,phone,role_id) VALUES (?,?,?,?,?,?)',
            [email,hashedPassword,firstName,lastName,phone,"2"]);

        res.status(201).json({ message: 'Utilisateur créé' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

const login = async (req, res) => {
    const {email, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        const isAdmin = await superUser.getUserByEmail(email);
        // Vérification du rôle de l'utilisateur
        const token = jwt.sign({ id: user.id, email: user.email ,role_id:isAdmin[0].role_id}, process.env.JWT_SECRET, { expiresIn: '6h' });

        res.json({token});
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

module.exports = { signup, login };