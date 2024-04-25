// gestion-curso.interface.ts

export interface GestionCurso {
    _id?:string
    nombreCurso: string;
    cantidadAlumno: number;
    nombreProfesor: string;
    rutProfesor:string;
    dias: string[];
    alumno: string[];
  }
  