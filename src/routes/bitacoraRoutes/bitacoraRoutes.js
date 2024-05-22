const express = require('express');
const router = express.Router();

const Bitacora = require('../../models/bitacoraModel');

router.post('/', async (req, res) => {
    const {_id, nombreCurso,nombreAsignatura,nombreProfesor,rutProfesor,  fecha,descripcion, } = req.body;

    // Intenta parsear la cadena de fecha
    const parsedFecha = Date.parse(fecha);
    
    if (isNaN(parsedFecha)) {
        // Si no se puede parsear la fecha, devuelve un error
        return res.status(400).json({ message: 'Formato de fecha inválido' });
    }

    const nuevaBitacora = new Bitacora({
        nombreCurso: nombreCurso, // Cambiar nombreCurso a nombreClase
        nombreAsignatura:nombreAsignatura,
        nombreProfesor:nombreProfesor,
        rutProfesor:rutProfesor, 
        fecha: new Date(parsedFecha), // Utiliza la fecha parseada
        descripcion: descripcion // Mantener la misma nomenclatura
    });

    console.log('Bitacora a guardar:', nuevaBitacora);

    try {
        const bitacoraGuardada = await nuevaBitacora.save();
        console.log('Bitacora guardada:', bitacoraGuardada);
        res.status(201).json(bitacoraGuardada);
    } catch (error) {
        console.error('Error al guardar bitacora:', error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
