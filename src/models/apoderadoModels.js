const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apoderadoSchema = new Schema({
    rut_apoderado:{type:String,required:true, unique: true},
    nombre_apoderado:{type:String,required:true},
    apellido_apoderado:{type:String,required:true},
    edad_apoderado:{type:Number,required:true},
    sexo_apoderado:{type:String,required:true},
    parentesco:{type:String,required:true},
    numero_contacto_apoderado:{type:String,required:true},
    email_contacto_apoderado:{type:String,required:true, unique: true},
    rut_estudiante:{type:String,required:true},
    nombre_estudiante:{type:String,required:true}

})
module.exports = mongoose.model('apoderado', apoderadoSchema);
