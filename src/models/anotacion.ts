export interface Anotacion{
    _id?: string;
    tipo_anotacion:string;
    nombre_curso:string;
    nombre_asignatura:string;
    fecha_anotacion: Date;
    nombre_profesor:string;
    rut_profesor:string;
    nombre_alumnos:{ nombre: string; rut: string;}[];
    descripcion_anotacion:string;
}