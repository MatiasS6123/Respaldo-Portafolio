const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
    const user = new User({
        rut: req.body.rut,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        email: req.body.email,
        contraseña: req.body.contraseña
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

function generateAuthToken(user) {
    return jwt.sign({ userId: user._id }, 'tu_clave_secreta', { expiresIn: '1h' });
}

// Ruta para el login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por su correo electrónico
        const user = await User.findOne({ email });

        // Verificar si el usuario existe y la contraseña es válida
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar un token de autenticación
        const token = generateAuthToken(user);

        // Enviar el token como respuesta
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error al realizar el login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
