import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GestionCurso } from 'src/models/gestionC';

@Injectable({
  providedIn: 'root'
})
export class GestionCService {
  private baseUrl = 'http://localhost:3000/api/curso'; // Corregir la URL base

  constructor(private http: HttpClient) {}

  asignarCurso(gestionCurso: GestionCurso): Observable<GestionCurso> {
    return this.http.post<GestionCurso>(this.baseUrl, gestionCurso);
  }

  getEstudiantes(): Observable<GestionCurso[]> {
    return this.http.get<GestionCurso[]>(this.baseUrl);
  }

  // Método para obtener un estudiante por su ID
  getCursoByNombre(nombreProfesor: string): Observable<GestionCurso> {
    return this.http.get<GestionCurso>(`${this.baseUrl}/${nombreProfesor}`);
  }

  updateCurso(nombreProfesor: string, curso: GestionCurso): Observable<GestionCurso> {
    return this.http.put<GestionCurso>(`${this.baseUrl}/${nombreProfesor}`, curso);
  }
  

  // Método para eliminar un estudiante por su ID
  deleteCurso(nombreProfesor: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${nombreProfesor}`);
  }
}
