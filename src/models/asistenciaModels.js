const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asistenciaSchema = new Schema({
    fecha:{type:Date, required:true},
    asistencia: [{
        nombre: { type: String, required: true },
        presente: { type: Boolean, required: true }
      }],
    nombreCurso:{type:String, requerided:true}
});
module.exports = mongoose.model('Asistencia', asistenciaSchema);
