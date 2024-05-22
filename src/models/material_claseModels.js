const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const materialclaseSchema = new Schema({
  nombre_curso:{type:String,required:true},
  fecha_subida_material:{type:Date,required:true},
  nombre_Profesor:{type:String,required:true},
  archivos:[{
    ruta_archivo:{type:String,required:true}

    }]  
})
module.exports = mongoose.model('material-clase', materialclaseSchema);
