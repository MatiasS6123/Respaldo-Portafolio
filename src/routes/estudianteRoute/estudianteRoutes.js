const express = require('express');
const router = express.Router();
const Estudiante = require('../../models/estudianteModel');

// Ruta para obtener todos los estudiantes
router.get('/', async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        console.log('Estudiantes obtenidos:', estudiantes); // Agregar log
        res.json(estudiantes);
    } catch (error) {
        console.error('Error al obtener estudiantes:', error); // Agregar log
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener un estudiante por su ID
/*router.get('/:rut', async (req, res) => {
    try {
        const estudiante = await Estudiante.findOne({ rut: req.params.rut });
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        console.log('Estudiante encontrado:', estudiante); // Agregar log
        res.json(estudiante);
    } catch (error) {
        console.error('Error al obtener estudiante por RUT:', error); // Agregar log
        res.status(500).json({ message: error.message });
    }
});
*/
router.get('/:rut', async (req, res) => {
    try {
        const estudiante = await Estudiante.findOne({ rut: req.params.rut }).lean(false);
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        console.log('Estudiante encontrado:', estudiante); // Agregar log
        res.json(estudiante);
    } catch (error) {
        console.error('Error al obtener estudiante por RUT:', error); // Agregar log
        res.status(500).json({ message: error.message });
    }
});


// Ruta para crear un nuevo estudiante
router.post('/', async (req, res) => {
    const estudiante = new Estudiante({
        rut: req.body.rut,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        sexo: req.body.sexo,
        nacionalidad: req.body.nacionalidad,
        fecha_nac: req.body.fecha_nac
    });
    console.log('Estudiante a guardar:', estudiante); // Agregar log

    try {
        const nuevoEstudiante = await estudiante.save();
        console.log('Estudiante guardado:', nuevoEstudiante); // Agregar log
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        console.error('Error al guardar estudiante:', error); // Agregar log
        res.status(400).json({ message: error.message });
    }
});

// Ruta para actualizar un estudiante por su ID
router.put('/:rut', async (req, res) => {
    try {
        // Validar que la solicitud tenga datos para actualizar
        if (!req.body) {
            return res.status(400).json({ message: 'No se proporcionaron datos para actualizar' });
        }

        // Buscar el estudiante por su RUT
        const estudiante = await Estudiante.findOne({ rut: req.params.rut });
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        
        // Actualizar los datos del estudiante con los datos proporcionados en la solicitud
        Object.assign(estudiante, req.body);
        console.log('Estudiante actualizado:', estudiante); // Registrar el estudiante actualizado

        // Guardar el estudiante actualizado en la base de datos
        const estudianteActualizado = await estudiante.save();
        res.json(estudianteActualizado);
    } catch (error) {
        console.error('Error al actualizar estudiante:', error); // Registrar el error
        res.status(500).json({ message: 'Error interno del servidor al actualizar el estudiante' });
    }
});



// Ruta para eliminar un estudiante por su ID
router.delete('/:rut', async (req, res) => {
    try {
        const result = await Estudiante.deleteOne({ rut: req.params.rut });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        
        console.log('Estudiante eliminado correctamente');
        res.json({ message: 'Estudiante eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar estudiante:', error);
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
