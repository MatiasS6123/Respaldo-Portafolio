import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { GestionCurso } from 'src/models/gestionC';
import { UserService } from './user.service';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class GestionCService {
  private baseUrl = 'http://localhost:3000/api/curso'; // Corregir la URL base

  constructor(private http: HttpClient,private userService:UserService) {}

  asignarCurso(gestionCurso: GestionCurso): Observable<GestionCurso> {
    return this.http.post<GestionCurso>(this.baseUrl, gestionCurso);
  }

  getEstudiantes(): Observable<GestionCurso[]> {
    return this.http.get<GestionCurso[]>(this.baseUrl);
  }

  // Método para obtener un estudiante por su ID
  getCursoByNombre(nombreCuso: string): Observable<GestionCurso> {
    return this.http.get<GestionCurso>(`${this.baseUrl}/${nombreCuso}/curso`);
  }

  updateCurso(_id: string, curso: GestionCurso): Observable<GestionCurso> {
    return this.http.put<GestionCurso>(`${this.baseUrl}/${_id}/actualizar`, curso);
  }
  

  // Método para eliminar un estudiante por su ID
  deleteCurso(_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${_id}/eliminar`);
  }

  getCursosAsignados(rutProfesor: string): Observable<GestionCurso[]> {
    return this.http.get<GestionCurso[]>(`${this.baseUrl}/${rutProfesor}/cursos`);
  }
  get_All_Cursos(): Observable<GestionCurso[]> {
    return this.http.get<GestionCurso[]>(`${this.baseUrl}/cursos`);
  }
  getCursoByID(_id: string): Observable<GestionCurso> {
    return this.http.get<GestionCurso>(`${this.baseUrl}/${_id}/buscar/curso`);
  }

  
 
  
  getCursoById(_id: string): Observable<GestionCurso> {
    const url = `${this.baseUrl}/${_id}`; // Construir la URL con el ID del curso
    return this.http.get<GestionCurso>(url);
  }
}
