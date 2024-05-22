export interface Estudiante{
    _id?:string;
    rut: string;
    numero_matricula_estudiante:string;
    nombre: string;
    apellido: string;
    edad: number;
    sexo:string;
    nacionalidad:string;
    fecha_nac:Date;
    tiene_enfermedad:boolean;
    tipo_enferemedad?:string;
    descripcion_enfermedad?:string;
    certificado_enfermedad?:File | string;


}