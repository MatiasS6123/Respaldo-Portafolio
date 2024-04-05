// estudiante.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
  rut: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true },
  sexo: { type: String, required: true },
  nacionalidad: { type: String, required: true },
  fecha_nac: { type: Date, required: true }
});

module.exports = mongoose.model('Estudiante', estudianteSchema);


