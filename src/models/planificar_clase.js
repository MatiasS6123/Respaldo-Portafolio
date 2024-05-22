const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planificar_claseSchema = new Schema({
    tema_planificacion:{type:String,required:true},
    fecha_inicio_planificacion:{type:Date,required:true},
    fecha_termino_planificacion:{type:Date,required:true},
    nombre_profesor:{type:String,required:true},
    rut_profesor:{type:String,required:true},
    cursos:[{
        nombreCurso:{type:String,required:true},

        }],
    objetivo_aprendisaje:{type:String,required:true},
    ambito_aprendisaje:{type:String,required:true},
    nucleo_aprendisaje:{type:String,required:true},
    indicador_exito_aprendisaje:{type:String,required:true},
    cantidad_actividades:{type:Number,required:true},
    actividades:[{
        nombre_actividad:{type:String,required:true},
        descripcion_actividad:{type:String,required:true},
        ambito_actividad:{type:String,required:true},
        nucleo_actividad:{type:String,required:true},
        objetivo_especifico_actividad:{type:String,required:true},
        rubrica_evaluacion_actividad:{type:String,required:true},
        evaluacion_actividad:{type:String,required:false}

    }]


});

module.exports = mongoose.model('planificar_clase', planificar_claseSchema);
