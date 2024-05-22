const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citacionSchema = new Schema({
    titulo_citacion:{type:String,required:true},
    nombre_curso:{type:String,required:true},
    estudiante:[{
        nombre:{type:String,required:true},
        rut:{type:String,required:true}
    }],
    nombre_profesor:{type:String,required:true},
    rut_profesor:{type:String,required:true},
    lugar_citacion:{type:String,required:true},
    fecha_citacion:{type:Date,required:true},
    estado_citacion:{type:String,required:true},
    descripcion_citacion:{type:String,required:true}

})

module.exports = mongoose.model('citacione', citacionSchema);
