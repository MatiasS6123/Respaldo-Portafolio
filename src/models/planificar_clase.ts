export interface Actividad {
    nombre_actividad: string;
    descripcion_actividad: string;
    ambito_actividad: string;
    nucleo_actividad: string;
    objetivo_especifico_actividad: string;
    rubrica_evaluacion_actividad: string;
    evaluacion_actividad: string;
}

export interface Planificacion {
    _id?:string;
    tema_planificacion: string;
    fecha_inicio_planificacion: Date;
    fecha_termino_planificacion: Date;
    nombre_profesor: string;
    rut_profesor: string;
    cursos:{nombreCurso:string}[];
    objetivo_aprendisaje: string;
    ambito_aprendisaje: string;
    nucleo_aprendisaje: string;
    indicador_exito_aprendisaje: string;
    cantidad_actividades: number;
    actividades: Actividad[];
}
