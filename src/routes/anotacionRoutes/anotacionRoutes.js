const express = require('express');
const router = express.Router();
const Anotacion = require('../../models/anotacionModel');
const Apoderado = require('../../models/apoderadoModels')
router.post('/', async (req, res) => {
    console.log('Datos recibidos para guardar la asistencia:', req.body); // Agregar log

    const nuevaAnotacion = new Anotacion({
        tipo_anotacion: req.body.tipo_anotacion,
        nombre_curso: req.body.nombre_curso,
        nombre_asignatura: req.body.nombre_asignatura,
        fecha_anotacion: req.body.fecha_anotacion,
        nombre_profesor: req.body.nombre_profesor,
        rut_profesor: req.body.rut_profesor,
        nombre_alumnos: req.body.nombre_alumnos,
        descripcion_anotacion: req.body.descripcion_anotacion
    });

    console.log('Anotacion a guardar:', nuevaAnotacion); // Agregar log

    try {
        const nuevaAnotacionGuardada = await nuevaAnotacion.save();
        console.log('Anotacion guardada:', nuevaAnotacionGuardada); // Agregar log
        res.status(201).json(nuevaAnotacionGuardada);
    } catch (error) {
        console.error('Error al guardar la Anotacion:', error); // Agregar log
        res.status(500).json({ message: 'Error al guardar la Anotacion' });
    }
});

router.get('/anotacion/:rut_profesor', async (req, res) => {
    try {
      const rut_profesor = req.params.rut_profesor;
      const anotacion = await Anotacion.find({ rut_profesor: rut_profesor });
      res.json(anotacion);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
router.put('/:_id/modificar', async (req, res) => {
    try {
        // Validar que la solicitud tenga datos para actualizar
        if (!req.body) {
            return res.status(400).json({ message: 'No se proporcionaron datos para actualizar' });
        }

        // Buscar el estudiante por su RUT
        const anotacion = await Anotacion.findOne({ _id: req.params._id });
        if (!anotacion) {
            return res.status(404).json({ message: 'anotacion no encontrado' });
        }
        
        // Actualizar los datos del estudiante con los datos proporcionados en la solicitud
        Object.assign(anotacion, req.body);
        console.log('anotacion  actualizada:', anotacion); // Registrar el estudiante actualizado

        // Guardar el estudiante actualizado en la base de datos
        const anotacionActualizado = await anotacion.save();
        res.json(anotacionActualizado);
    } catch (error) {
        console.error('Error al actualizar anotacion:', error); // Registrar el error
        res.status(500).json({ message: 'Error interno del servidor al actualizar el anotacion' });
    }
});

router.delete('/:_id/eliminar', async (req, res) => {
    try {
        const result = await Anotacion.deleteOne({ _id: req.params._id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Anotación no encontrada' });
        }
        
        console.log('Anotacion eliminada correctamente');
        res.json({ message: 'Anotacion eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar  Anotacion:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/:rut_apoderado/anotaciones', async (req, res) => {
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

        // Buscar las anotaciones del alumno asociado al apoderado
        const anotaciones = await Anotacion.find();

        // Filtrar los objetos de anotaciones que coinciden con el rut del alumno
        const anotacionesAlumno = anotaciones.map(doc => {
            return {
                ...doc._doc,
                nombre_alumnos: doc.nombre_alumnos.filter(alumno => alumno.rut === rut_alumno)
            };
        }).filter(doc => doc.nombre_alumnos.length > 0); // Solo incluir documentos con al menos una anotación

        if (!anotacionesAlumno || anotacionesAlumno.length === 0) {
            return res.status(404).json({ message: 'Anotaciones del alumno no encontradas' });
        }

        // Si se encuentran las anotaciones del alumno, devolverlas como respuesta
        return res.status(200).json(anotacionesAlumno);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.get('/anotacion/:rut_profesor', async (req, res) => {
    try {
      const rut_profesor = req.params.rut_profesor;
      const anotacion = await Anotacion.find({ rut_profesor: rut_profesor });
      res.json(anotacion);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



router.get('/:_id/anotacion/buscar', async (req, res) => {
    try {
      const _id = req.params._id;
      const anotacion = await Anotacion.findOne({ _id: _id });
      res.json(anotacion);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



module.exports = router;


