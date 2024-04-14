export interface Asistencia {
    fecha: Date;
    asistencia: { nombre: string; presente: boolean }[];
  }