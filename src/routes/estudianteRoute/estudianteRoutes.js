const express = require('express');
const router = express.Router();
const upload = require('../uploadRoutes/uploadRoutes');  
const Estudiante = require('../../models/estudianteModel');

router.post('/', upload.fields([{ name: 'certificado_enfermedad', maxCount: 1 }]), async (req, res) => {
    const { rut, numero_matricula_estudiante, nombre, apellido, edad, sexo, nacionalidad, fecha_nac, tiene_enfermedad, tipo_enfermedad, descripcion_enfermedad } = req.body;

    const estudiante = new Estudiante({
        rut: rut,
        numero_matricula_estudiante: numero_matricula_estudiante,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        sexo: sexo,
        nacionalidad: nacionalidad,
        fecha_nac: fecha_nac,
        tiene_enfermedad: tiene_enfermedad,
        tipo_enfermedad: tipo_enfermedad,
        descripcion_enfermedad: descripcion_enfermedad,
        certificado_enfermedad: req.files['certificado_enfermedad'][0].path // Guardar la ruta del archivo certificado_enfermedad
    });

    console.log('Estudiante a guardar:', estudiante);

    try {
        const nuevoEstudiante = await estudiante.save();
        console.log('Estudiante guardado correctamente:', nuevoEstudiante);
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        console.error('Error al guardar estudiante:', error);
        if (error.code === 11000) { // Código de error para duplicados
            res.status(400).json({ message: 'Error Rut o Numero de matricula duplicados', field: Object.keys(error.keyValue) });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
});

router.get('/estudiante/:_id', async (req, res) => {
    try {
        const estudiante = await Estudiante.findOne({ _id: req.params._id }).lean(false);
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        if (estudiante.certificado_enfermedad) {
            estudiante.certificado_enfermedad_url = `${req.protocol}://${req.get('host')}/${estudiante.certificado_enfermedad}`;
        }
        console.log('Estudiante encontrado:', estudiante); // Agregar log
        res.json(estudiante);
    } catch (error) {
        console.error('Error al obtener estudiante por RUT:', error); // Agregar log
        res.status(500).json({ message: error.message });
    }
});


// Ruta para crear un nuevo estudiante

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

// Ruta para actualizar un estudiante por su ID
router.put('/:_id/modificar', upload.fields([{ name: 'certificado_enfermedad', maxCount: 1 }]), async (req, res) => {
    try {
        // Validar que la solicitud tenga datos para actualizar
        if (!req.body) {
            return res.status(400).json({ message: 'No se proporcionaron datos para actualizar' });
        }

        // Buscar el estudiante por su ID
        const estudiante = await Estudiante.findById(req.params._id);
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        // Actualizar los datos del estudiante con los datos proporcionados en la solicitud
        Object.assign(estudiante, req.body);

        // Si se proporciona un nuevo archivo, actualizar el campo correspondiente
        if (req.files && req.files['certificado_enfermedad']) {
            estudiante.certificado_enfermedad = req.files['certificado_enfermedad'][0].path;
        }

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
router.delete('/:_id/eliminar', async (req, res) => {
    try {
        const result = await Estudiante.deleteOne({ _id: req.params._id });
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


router.get('/nombres', async (req, res) => {
    try {
        const estudiantes = await Estudiante.find({}, 'nombre');
        console.log('Nombres de estudiantes obtenidos:', estudiantes); // Agregar log
        const nombres = estudiantes.map(estudiante => estudiante.nombre);
        res.json(nombres);
    } catch (error) {
        console.error('Error al obtener nombres de estudiantes:', error); // Agregar log
        res.status(500).json({ message: error.message });
    }
});

router.get('/:rut_estudiante/estudiante', async (req, res) => {
    try {
        const estudiante = await Estudiante.findOne({ rut: req.params.rut_estudiante }).lean(false);
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        if (estudiante.certificado_enfermedad) {
            estudiante.certificado_enfermedad_url = `${req.protocol}://${req.get('host')}/${estudiante.certificado_enfermedad}`;
        }
        console.log('Estudiante encontrado:', estudiante); // Agregar log
        res.json(estudiante);
    } catch (error) {
        console.error('Error al obtener estudiante por RUT:', error); // Agregar log
        res.status(500).json({ message: error.message });
    }
});


router.get('/src/upload/:nombreArchivo', (req, res) => {
    let nombreArchivo = req.params.nombreArchivo;
    res.sendFile(path.join(__dirname, 'src/upload', nombreArchivo));
});

module.exports = router;
