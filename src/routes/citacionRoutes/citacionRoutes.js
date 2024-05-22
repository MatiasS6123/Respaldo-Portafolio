const express = require('express');
const router = express.Router();
const Citacion= require('../../models/citacionModels')
const Apoderado = require('../../models/apoderadoModels');

router.post('/citaciones', async (req, res) => {
    try {
        // Crear una nueva citación con los datos del cuerpo de la solicitud
        const nuevaCitacion = new Citacion(req.body);

        // Guardar la nueva citación en la base de datos
        await nuevaCitacion.save();

        // Devolver la nueva citación como respuesta
        return res.status(200).json(nuevaCitacion);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.get('/citaciones/:rut_profesor', async (req, res) => {
    try {
      const rut_profesor = req.params.rut_profesor;
      const citaciones = await Citacion.find({ rut_profesor: rut_profesor });
      res.json(citaciones);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


router.get('/:rut_apoderado/citaciones', async (req, res) => {
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

        // Buscar las citaciones del alumno asociado al apoderado
        const citaciones = await Citacion.find();

        // Filtrar los objetos de citaciones que coinciden con el rut del alumno
        const citacionesAlumno = citaciones.map(doc => {
            return {
                ...doc._doc,
                estudiante: doc.estudiante.filter(estudiante => estudiante.rut === rut_alumno)
            };
        }).filter(doc => doc.estudiante.length > 0); // Solo incluir documentos con al menos una citación

        if (!citacionesAlumno || citacionesAlumno.length === 0) {
            return res.status(404).json({ message: 'Citaciones del alumno no encontradas' });
        }

        // Si se encuentran las citaciones del alumno, devolverlas como respuesta
        return res.status(200).json(citacionesAlumno);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.put('/:_id/modificar', async (req, res) => {
    try {
        // Validar que la solicitud tenga datos para actualizar
        if (!req.body) {
            return res.status(400).json({ message: 'No se proporcionaron datos para actualizar' });
        }

        // Buscar el estudiante por su RUT
        const citacion = await Citacion.findOne({ _id: req.params._id });
        if (!citacion) {
            return res.status(404).json({ message: 'citacion no encontrado' });
        }
        
        // Actualizar los datos del estudiante con los datos proporcionados en la solicitud
        Object.assign(citacion, req.body);
        console.log('citación  actualizada:', citacion); // Registrar el estudiante actualizado

        // Guardar el estudiante actualizado en la base de datos
        const citacionActualizado = await citacion.save();
        res.json(citacionActualizado);
    } catch (error) {
        console.error('Error al actualizar anotacion:', error); // Registrar el error
        res.status(500).json({ message: 'Error interno del servidor al actualizar el anotacion' });
    }
});

router.delete('/:_id/eliminar', async (req, res) => {
    try {
        const result = await Citacion.deleteOne({ _id: req.params._id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Citación no encontrado' });
        }
        
        console.log('Citacion eliminada correctamente');
        res.json({ message: 'Citacion eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar Citacion:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/:_id/buscar', async (req, res) => {
    try {
      const _id = req.params._id;
      const citacion = await Citacion.findOne({ _id: _id });
      res.json(citacion);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


module.exports = router;
