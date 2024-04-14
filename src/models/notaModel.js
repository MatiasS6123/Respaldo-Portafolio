const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notaSchema = new Schema({
    asignatura: { type: String, required: true },
    curso: { type: String, required: true },
    notas: [{
        nombre: { type: String, required: true },
        nota: { type: Number, required: true }
    }],
    fecha: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Nota', notaSchema);
