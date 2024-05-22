import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nota } from 'src/models/nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private baseUrl = 'http://localhost:3000/api/nota'; // Corregir la URL base

  constructor(private http: HttpClient) {}

  guardarNota(nota: Nota): Observable<any> {
    return this.http.post<any>(this.baseUrl, nota);
  }

  getNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.baseUrl);
  }

  // Método para obtener un estudiante por su ID
  getNotasByCurso(nombreCurso: string): Observable<Nota> {
    return this.http.get<Nota>(`${this.baseUrl}/${nombreCurso}`);
  }

  updateCurso(curso: string, nota: Nota): Observable<Nota> {
    return this.http.put<Nota>(`${this.baseUrl}/${curso}`, nota);
  }
  

  // Método para eliminar un estudiante por su ID
  deleteNota(curso: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${curso}`);
  }
  obtener_Nota_Apoderado(rut_apoderado: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${rut_apoderado}/notas`);
  }
}
