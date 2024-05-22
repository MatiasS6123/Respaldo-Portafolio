export interface Asistencia {
  _id?: string;
  nombreCurso:string;
  nombreAsignatura:string;
  nombreProfesor:string;
  rutProfesor:string
  fecha: Date;
  asistencia: { nombre: string; rut: string; presente: boolean }[];
  
}