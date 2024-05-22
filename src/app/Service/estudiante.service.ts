import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Estudiante } from 'src/models/Estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private baseUrl = 'http://localhost:3000/api/estudiante'; // Corregir la URL base

  constructor(private http: HttpClient) {}

  get_Imagen(nombreArchivo:string){
    return `${this.baseUrl}/src/upload/${nombreArchivo}`;

  }

  // Método para obtener todos los estudiantes
  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.baseUrl);
  }

  // Método para obtener un estudiante por su ID
  getEstudianteById(_id: string): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.baseUrl}/estudiante/${_id}`);
  }
  buscar_Estudiante(rut_estudiante: string): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.baseUrl}/${rut_estudiante}/estudiante`);
  }


  // Método para crear un nuevo estudiante
  createEstudiante(estudiante: Estudiante, file: File): Observable<Estudiante> {
    const formData: FormData = new FormData();
    
    // Agrega los campos del estudiante al objeto FormData
    Object.keys(estudiante).forEach(key => {
      formData.append(key, estudiante[key]);
    });
  
    // Agrega el archivo al objeto FormData
    formData.append('certificado_enfermedad', file);
  
    return this.http.post<Estudiante>(this.baseUrl, formData);
  }
  

  // Método para actualizar un estudiante por su ID
  update_Estudiante(_id: string, estudiante: Estudiante, file?: File): Observable<Estudiante> {
    const formData: FormData = new FormData();

    // Agrega los campos del estudiante al objeto FormData
    Object.keys(estudiante).forEach(key => {
      formData.append(key, estudiante[key]);
    });

    // Si se proporciona un archivo, agregarlo al objeto FormData
    if (file) {
      formData.append('certificado_enfermedad', file);
    }

    return this.http.put<Estudiante>(`${this.baseUrl}/${_id}/modificar`, formData);
  }
  

  // Método para eliminar un estudiante por su ID
  delete_Estudiante(_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${_id}/eliminar`);
  }
  
}
