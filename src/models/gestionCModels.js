// estudiante.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gestionCSchema = new Schema({
  nombreCurso: { type: String, required: true,unique: true },
  cantidadAlumno: { type: Number, required: true },
  profesor: [{
    nombre: { type: String, required: true },
    rut: { type: String, required: true }
  }],
  nivel_curso:{type:String, required:true}, 
  dias: { type: [String], required: true },
  alumno: [{
    nombre: { type: String, required: true },
    rut: { type: String, required: true }
  }]

});

module.exports = mongoose.model('Gestion-Curso', gestionCSchema);

