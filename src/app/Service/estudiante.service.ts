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

  // Método para obtener todos los estudiantes
  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.baseUrl);
  }

  // Método para obtener un estudiante por su ID
  getEstudianteById(rut: string): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.baseUrl}/${rut}`);
  }

  // Método para crear un nuevo estudiante
  createEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.baseUrl, estudiante);
  }

  // Método para actualizar un estudiante por su ID
  updateEstudiante(rut: string, estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.baseUrl}/${rut}`, estudiante);
  }
  

  // Método para eliminar un estudiante por su ID
  deleteEstudiante(rut: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${rut}`);
  }
}
