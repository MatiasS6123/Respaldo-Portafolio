const express = require('express');
const router = express.Router();
const Nota = require('../../models/notaModel');

router.post('/', async (req, res) => {
    try {
        const nuevaNota = req.body;
        
        console.log('Datos recibidos para guardar:', nuevaNota);
        
        // Guardar la nueva nota en la base de datos
        const notaGuardada = await Nota.create(nuevaNota);
        
        console.log('Nota guardada en la base de datos:', notaGuardada);

        res.status(201).send('Nota guardada exitosamente');
    } catch (error) {
        console.error('Error al guardar la nota:', error);
        res.status(500).send('Error al guardar la nota');
    }
});

router.put('/:curso', async (req, res) => {
    try {
        // Validar que la solicitud tenga datos para actualizar
        if (!req.body) {
            return res.status(400).json({ message: 'No se proporcionaron datos para actualizar' });
        }

        // Buscar el nota por su Curso
        const curso = await Nota.findOne({ curso: req.params.curso });
        if (!curso) {
            return res.status(404).json({ message: 'nota no encontrado' });
        }
        
        // Actualizar los datos del estudiante con los datos proporcionados en la solicitud
        Object.assign(curso, req.body);
        console.log('nota actualizado:', curso); // Registrar el estudiante actualizado

        // Guardar el estudiante actualizado en la base de datos
        const notaActualizada = await curso.save();
        res.json(notaActualizada);
    } catch (error) {
        console.error('Error al actualizar nota:', error); // Registrar el error
        res.status(500).json({ message: 'Error interno del servidor al actualizar el estudiante' });
    }
});



// Ruta para eliminar un estudiante por su ID
router.delete('/:curso', async (req, res) => {
    try {
        const result = await Nota.deleteOne({ curso: req.params.curso });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'nota no encontrado' });
        }
        
        console.log('nota eliminada correctamente');
        res.json({ message: 'nota eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar nota:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/:curso', async (req, res) => {
    try {
        const curso = await Nota.findOne({ curso: req.params.curso }).lean(false);
        if (!curso) {
            return res.status(404).json({ message: 'nota no encontrado' });
        }
        console.log('nota encontrado:', curso); // Agregar log
        res.json(curso);
    } catch (error) {
        console.error('Error al obtener curso por nombre:', error); // Agregar log
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
