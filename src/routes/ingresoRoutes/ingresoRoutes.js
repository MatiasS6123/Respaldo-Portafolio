const express = require('express');
const router = express.Router();
const Ingreso=require('../../models/ingresoModels')
const upload = require('../uploadRoutes/uploadRoutes');  

router.post('/', upload.fields([{ name: 'foto_ingreso', maxCount: 1 }]), async (req, res) => {
    const { nombre_usuario, rut_usuario, fecha_ingreso, foto_ingreso } = req.body;

    const nuevoIngresoUsuario = new Ingreso({
        nombre_usuario: nombre_usuario,
        rut_usuario: rut_usuario,
        fecha_ingreso:fecha_ingreso,
        foto_ingreso: req.files['foto_ingreso'][0].path, // Guardar la ruta del archivo foto_salida
    });

    console.log('Ingreso de usuario a guardar:', nuevoIngresoUsuario); // Agregar log

    try {
        const ingresoGuardado = await nuevoIngresoUsuario.save();
        console.log('Ingreso de usuario guardado:', ingresoGuardado); // Agregar log
        res.status(201).json(ingresoGuardado);
    } catch (error) {
        console.error('Error al guardar Ingreso de usuario:', error); // Agregar log
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;
