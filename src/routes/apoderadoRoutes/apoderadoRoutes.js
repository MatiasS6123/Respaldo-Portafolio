const express = require('express');
const router = express.Router();
const Apoderado=require('../../models/apoderadoModels')
const bcrypt = require('bcryptjs'); // Agregada la importación de bcrypt

const User = require('../../models/userModel'); // Asegúrate de tener el modelo de Usuario

// Añade esto a tu archivo de rutas del apoderado

router.post('/', async (req, res) => {
    const { rut_apoderado, nombre_apoderado, apellido_apoderado, edad_apoderado, sexo_apoderado, parentesco, numero_contacto_apoderado, email_contacto_apoderado, rut_estudiante, nombre_estudiante } = req.body;
    const password = rut_apoderado; // Usar el rut del apoderado como contraseña por defecto
    const hashedPassword = await bcrypt.hash(password, 10); // Hash de la contraseña

    const nuevoApoderado = new Apoderado({
        rut_apoderado,
        nombre_apoderado,
        apellido_apoderado,
        edad_apoderado,
        sexo_apoderado,
        parentesco,
        numero_contacto_apoderado,
        email_contacto_apoderado,
        rut_estudiante,
        nombre_estudiante
    });

    try {
        const apoderadoGuardado = await nuevoApoderado.save();

        // Crear un nuevo usuario con el mismo ID que el apoderado
        const user = new User({
            _id: apoderadoGuardado._id,
            rut: rut_apoderado,
            nombre: nombre_apoderado,
            apellido: apellido_apoderado,
            edad: edad_apoderado,
            tipo_usuario: 'apoderado', // Asumiendo que el tipo de usuario es 'apoderado'
            email: email_contacto_apoderado,
            password: hashedPassword // Guardar la contraseña cifrada
        });

        const newUser = await user.save();
        res.status(201).json({ apoderado: apoderadoGuardado, user: newUser });
    } catch (err) {
        console.error('Error al guardar apoderado:', err);
        res.status(400).json({ message: err.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const apoderado = await Apoderado.find();
        res.json(apoderado);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/:_id/apoderado', async (req, res) => {
    try {
        const apoderado = await Apoderado.findOne({ _id: req.params._id }).lean(false);
        if (!apoderado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        console.log('Apoderado encontrado:', apoderado); // Agregar log
        res.json(apoderado);
    } catch (error) {
        console.error('Error al obtener Apoderado por RUT:', error); // Agregar log
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:_id/eliminar', async (req, res) => {
    try {
        const result = await Apoderado.deleteOne({ _id: req.params._id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Apoderado no encontrado' });
        }
        
        console.log('Apoderado eliminado correctamente');
        res.json({ message: 'Apoderado eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar Apderado:', error);
        res.status(500).json({ message: error.message });
    }
});

router.put('/:_id/modificar', async (req, res) => {
    try {
        // Validar que la solicitud tenga datos para actualizar
        if (!req.body) {
            return res.status(400).json({ message: 'No se proporcionaron datos para actualizar' });
        }

        // Buscar el estudiante por su RUT
        const apoderado = await Apoderado.findOne({ _id: req.params._id });
        if (!apoderado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        // Actualizar los datos del estudiante con los datos proporcionados en la solicitud
        Object.assign(apoderado, req.body);
        console.log('apoderado actualizado:', apoderado); // Registrar el estudiante actualizado

        // Guardar el estudiante actualizado en la base de datos
        const userActualizado = await apoderado.save();
        res.json(userActualizado);
    } catch (error) {
        console.error('Error al actualizar apoderado:', error); // Registrar el error
        res.status(500).json({ message: 'Error interno del servidor al actualizar el usuario' });
    }
});




module.exports = router;
