const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ingresoSchema = new Schema({
    nombre_usuario:{type:String,required:true},
    rut_usuario:{type:String,required:true},
    fecha_ingreso:{type:Date,required:true},
    foto_ingreso:{type:String,required:true}
    
})
module.exports = mongoose.model('ingreso', ingresoSchema);
