const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const anotacionSchema = new Schema({
    tipo_anotacion:{type:String,required:true},
    nombre_curso:{type:String,required:true},
    nombre_asignatura:{type:String,required:true},
    fecha_anotacion:{type:Date,required:true},
    nombre_profesor:{type:String,required:true},
    rut_profesor:{type:String,required:true},
    nombre_alumnos:[{
        nombre:{type:String,required:true},
        rut:{type:String,required:true}
    }],
    descripcion_anotacion:{type:String,required:true}

})

module.exports = mongoose.model('Anotacione', anotacionSchema);
