const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bitacorachema = new Schema({
  nombreCurso: { type: String,required: true},
  nombreAsignatura:{type:String,required:true},
  nombreProfesor:{type:String, required:true},
  rutProfesor:{type:String,required:true},
  fecha: {type:Date, required:true},
  descripcion:{type: String, required:true}
  
});

module.exports = mongoose.model('Bitacora', bitacorachema);

