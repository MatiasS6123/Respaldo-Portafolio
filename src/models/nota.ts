export interface Nota{
    asignatura: string;
    curso: string;
    notas: {
        nombre: string;
        nota: number;
    }[];
    fecha: Date;
}