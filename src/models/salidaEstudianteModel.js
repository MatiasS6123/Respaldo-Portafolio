const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salidaestudianteSchema = new Schema({
    
    // Campo para el nombre del estudiante
    nombre_estudiante: {type: String,required: true},
    // Campo para quien retira al estudiante
    quien_retira: {type: String,required: true},

    motivo_retiro:{type: String,requerired:true},
    // Campo para la fecha de salida
    fecha_salida: {type: Date,required: true},
    // Campo para la foto
    foto_salida: {type: String,required: true},
    foto_cedula_quien_retira:{type:String,required:true}
});

module.exports = mongoose.model('SalidaEstudiante', salidaestudianteSchema);
