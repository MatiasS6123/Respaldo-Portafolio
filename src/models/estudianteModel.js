// estudiante.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
  rut: { type: String, required: true,unique: true },
  numero_matricula_estudiante:{type:String,required:true,unique: true},
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true },
  sexo: { type: String, required: true },
  nacionalidad: { type: String, required: true },
  fecha_nac: { type: Date, required: true },
  tiene_enfermedad:{type:Boolean, required:true},
  tipo_enfermedad:{type:String,required:false},
  descripcion_enfermedad:{type:String, required:false},
  certificado_enfermedad:{type:String,require:false}

});

module.exports = mongoose.model('Estudiante', estudianteSchema);


