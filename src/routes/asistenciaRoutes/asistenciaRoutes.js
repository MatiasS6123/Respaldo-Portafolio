const express = require('express');
const router = express.Router();
const Asistencia = require('../../models/asistenciaModels');

router.post('/', async (req, res) => {
    try {
      const nuevaAsistencia = req.body;
      // Guardar la nueva asistencia en la base de datos
      await Asistencia.create(nuevaAsistencia);
      res.status(201).send('Asistencia guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar la asistencia:', error);
      res.status(500).send('Error al guardar la asistencia');
    }
  });
  

module.exports = router;

