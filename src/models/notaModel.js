const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notaSchema = new Schema({
    nombreCurso: { type: String, required: true },
    asignatura: { type: String, required: true },
    nombreProfesor:{type:String,required:true},
    rutProfesor:{type:String,required:true},
    notas: [{
        nombre: { type: String, required: true },
        rut:{type:String,required:true},
        nota: [{
            
        }]
    }],
    fecha: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Nota', notaSchema);
