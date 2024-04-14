const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bitacorachema = new Schema({
  nombreCurso: { type: String,required: true},
  descripcion:{type: String, required:true},
  fecha: {type:Date, required:true}
});

module.exports = mongoose.model('Bitacora', bitacorachema);

