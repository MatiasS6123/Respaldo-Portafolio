const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salidaestudianteSchema = new Schema({
    // Campo para el nombre del estudiante
    nombreEstudiante: {type: String,required: true},
    // Campo para quien retira al estudiante
    quienRetira: {type: String,required: true},
    // Campo para la fecha de salida
    fecha: {type: Date,required: true},
    // Campo para la foto
    foto: {type: String,required: true}
});

module.exports = mongoose.model('SalidaEstudiante', salidaestudianteSchema);
