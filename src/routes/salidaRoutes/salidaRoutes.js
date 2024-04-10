const express = require('express');
const router = express.Router();
const SalidaEstudiante  = require('../../models/salidaEstudianteModel');

router.post('/', async (req, res) => {
    const { nombreEstudiante, quienRetira, fecha, foto } = req.body;

    const nuevaSalidaEstudiante = new SalidaEstudiante({
        nombreEstudiante: nombreEstudiante,
        quienRetira: quienRetira,
        fecha: fecha,
        foto: foto
    });

    console.log('Salida de estudiante a guardar:', nuevaSalidaEstudiante); // Agregar log

    try {
        const salidaGuardada = await nuevaSalidaEstudiante.save();
        console.log('Salida de estudiante guardada:', salidaGuardada); // Agregar log
        res.status(201).json(salidaGuardada);
    } catch (error) {
        console.error('Error al guardar salida de estudiante:', error); // Agregar log
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
