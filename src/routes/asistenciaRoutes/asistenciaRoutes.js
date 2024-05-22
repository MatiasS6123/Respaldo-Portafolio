const express = require('express');
const router = express.Router();
const Asistencia = require('../../models/asistenciaModels');
const Apoderado = require('../../models/apoderadoModels');

router.post('/', async (req, res) => {
    console.log('Datos recibidos para guardar la asistencia:', req.body); // Agregar log
  
    const nuevaAsistencia = new Asistencia({
        nombreCurso: req.body.nombreCurso,
        nombreAsignatura: req.body.nombreAsignatura,
        nombreProfesor: req.body.nombreProfesor,
        rutProfesor: req.body.rutProfesor,
        fecha: req.body.fecha,
        asistencia: req.body.asistencia
    });
  
    console.log('Asistencia a guardar:', nuevaAsistencia); // Agregar log
  
    try {
        const nuevaAsistenciaGuardada = await nuevaAsistencia.save();
        console.log('Asistencia guardada:', nuevaAsistenciaGuardada); // Agregar log
        res.status(201).json(nuevaAsistenciaGuardada);
    } catch (error) {
        console.error('Error al guardar la asistencia:', error); // Agregar log
        res.status(500).json({ message: 'Error al guardar la asistencia' });
    }
});

router.get('/:rut_apoderado/asistencia', async (req, res) => {
    try {
        const rut_apoderado = req.params.rut_apoderado;
        
        // Buscar al apoderado por su rut en la colección de apoderados
        const apoderado = await Apoderado.findOne({ rut_apoderado: rut_apoderado });

        if (!apoderado) {
            return res.status(404).json({ message: 'Apoderado no encontrado' });
        }

        // Obtener el rut del alumno del apoderado
        const rut_alumno = apoderado.rut_estudiante;

        console.log("Rut del alumno:", rut_alumno); 

        // Buscar la asistencia del alumno asociado al apoderado
        const asistencias = await Asistencia.find();

        // Filtrar los objetos de asistencia que coinciden con el rut del alumno
        const asistenciaAlumno = asistencias.map(doc => {
            return {
                ...doc._doc,
                asistencia: doc.asistencia.filter(asist => asist.rut === rut_alumno)
            };
        }).filter(doc => doc.asistencia.length > 0); // Solo incluir documentos con al menos un objeto de asistencia

        if (!asistenciaAlumno || asistenciaAlumno.length === 0) {
            return res.status(404).json({ message: 'Asistencia del alumno no encontrada' });
        }

        // Si se encuentra la asistencia del alumno, devolverla como respuesta
        return res.status(200).json(asistenciaAlumno);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});


module.exports = router;
