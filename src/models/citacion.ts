export interface Citacion{
    _id?:string;
    titulo_citacion:string;
    nombre_curso:string;
    estudiante:{nombre:string,rut:string}[];
    nombre_profesor:string;
    rut_profesor:string;
    lugar_citacion:string;
    fecha_citacion:Date;
    estado_citacion:string;
    descripcion_citacion:string;

}