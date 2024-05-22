export interface Nota{
    _id?:string;
    nombreCurso: string;
    asignatura: string;
    nombreProfesor:string;
    rutProfesor:string;
    notas: {
        nombre: string;
        rut:string;
        nota: number [];
    }[];
    fecha: Date;
}