const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Agregada la importación de bcrypt

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
    const { rut, nombre, apellido, edad, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash de la contraseña

    const user = new User({
        rut: rut,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        email: email,
        password: hashedPassword // Guardar la contraseña cifrada
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
        console.log('Inicio de sesión solicitado para el usuario con correo electrónico:', email);

        // Buscar al usuario por su correo electrónico
        const user = await User.findOne({ email });

        // Verificar si el usuario existe
        if (!user) {
            console.log('Usuario no encontrado.');
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        console.log('Usuario encontrado:', user);

        // Verificar si la contraseña es válida utilizando bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Contraseña incorrecta.');
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        console.log('Contraseña válida.');

        // Generar un token de autenticación
        const token = generateAuthToken(user);
        console.log('Token de autenticación generado:', token);

        // Enviar el token como respuesta
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error al realizar el login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
