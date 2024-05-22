const express = require('express');
const router = express.Router();
const Planificacion=require('../../models/planificar_clase')
router.post('/', async (req, res) => {
    try {
      console.log('Recibiendo solicitud para guardar una planificación...');
      const planificacion = new Planificacion(req.body);
      await planificacion.save();
      console.log('Planificación guardada con éxito:', planificacion);
      res.status(201).send(planificacion);
    } catch (error) {
      console.error('Error al guardar la planificación:', error);
      res.status(400).send(error);
    }
});


//Buscar Planificacion por ID
router.get('/:_id/planifica', async (req, res) => {
    try {
      const planificacion = await Planificacion.findById(req.params._id);
      if (!planificacion) {
        return res.status(404).send();
      }
      res.send(planificacion);
    } catch (error) {
      res.status(500).send(error);
    }
});
router.get('/:rut_profesor/planificacion', async (req, res) => {
  try {
    const rut_profesor = req.params.rut_profesor;
    const planificacion = await Planificacion.find({rut_profesor: rut_profesor});
    if (!planificacion || planificacion.length === 0) {
      return res.status(404).send();
    }
    res.send(planificacion);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:planificacion/:_id/eliminar', async (req, res) => {
    try {
      const planificacion = await Planificacion.findByIdAndDelete(req.params._id);
      if (!planificacion) {
        return res.status(404).send();
      }
      res.send(planificacion);
    } catch (error) {
      res.status(500).send(error);
    }
});
router.put('/planificacion/:_id', async (req, res) => {
  try {
    const planificacion = await Planificacion.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!planificacion) {
      return res.status(404).send();
    }
    res.send(planificacion);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
