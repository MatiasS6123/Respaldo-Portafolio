const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asistenciaSchema = new Schema({
  nombreCurso:{type:String, required:true},
  nombreAsignatura:{type:String,required:true},
  nombreProfesor:{type:String, required:true},
  rutProfesor:{type:String, required:true},
  fecha: { type: Date, required: true },
  asistencia: [{
    nombre: { type: String, required: true },
    rut: { type: String, required: true }, 
    presente: { type: Boolean, required: true }
  }]
});
module.exports = mongoose.model('Asistencia', asistenciaSchema);
