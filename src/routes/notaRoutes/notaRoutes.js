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

module.exports = router;
