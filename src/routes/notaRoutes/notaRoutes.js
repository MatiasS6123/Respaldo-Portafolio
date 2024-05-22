const express = require('express');
const router = express.Router();
const Nota = require('../../models/notaModel');
const Apoderado= require('../../models/apoderadoModels')
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

router.put('/:nombreCurso', async (req, res) => {
    try {
        // Validar que la solicitud tenga datos para actualizar
        if (!req.body) {
            return res.status(400).json({ message: 'No se proporcionaron datos para actualizar' });
        }

        // Buscar el nota por su Curso
        const curso = await Nota.findOne({ nombreCurso: req.params.nombreCurso });
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

router.get('/:nombreCurso', async (req, res) => {
    try {
        const curso = await Nota.findOne({ nombreCurso: req.params.nombreCurso }).lean(false);
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

router.get('/:rut_apoderado/notas', async (req, res) => {
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

        // Buscar las notas del alumno asociado al apoderado
        const notas = await Nota.find();

        // Filtrar los objetos de notas que coinciden con el rut del alumno
        const notasAlumno = notas.map(doc => {
            return {
                ...doc._doc,
                notas: doc.notas.filter(nota => nota.rut === rut_alumno)
            };
        }).filter(doc => doc.notas.length > 0); // Solo incluir documentos con al menos una nota

        if (!notasAlumno || notasAlumno.length === 0) {
            return res.status(404).json({ message: 'Notas del alumno no encontradas' });
        }

        // Si se encuentran las notas del alumno, devolverlas como respuesta
        return res.status(200).json(notasAlumno);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});


module.exports = router;
