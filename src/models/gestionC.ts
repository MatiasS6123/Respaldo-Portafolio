// gestion-curso.interface.ts

export interface GestionCurso {
  _id?: string;
  nombreCurso: string;
  cantidadAlumno: number;
  profesor: { nombre: string, rut: string }[];
  nivel_curso:string;
  dias: string[];
  alumno: { nombre: string, rut: string }[];
}
