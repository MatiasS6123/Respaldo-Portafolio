const express = require('express');
const router = express.Router();
const SalidaEstudiante  = require('../../models/salidaEstudianteModel');
const upload = require('../uploadRoutes/uploadRoutes');  

router.post('/', upload.fields([{ name: 'foto_salida', maxCount: 1 }, { name: 'foto_cedula_quien_retira', maxCount: 1 }]), async (req, res) => {
    const { nombre_estudiante, quien_retira, motivo_retiro, fecha_salida } = req.body;

    const nuevaSalidaEstudiante = new SalidaEstudiante({
        nombre_estudiante: nombre_estudiante,
        quien_retira: quien_retira,
        motivo_retiro:motivo_retiro,
        fecha_salida: fecha_salida,
        foto_salida: req.files['foto_salida'][0].path, // Guardar la ruta del archivo foto_salida
        foto_cedula_quien_retira: req.files['foto_cedula_quien_retira'][0].path // Guardar la ruta del archivo foto_cedula_quien_retira
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
