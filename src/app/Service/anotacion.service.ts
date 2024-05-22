import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anotacion } from 'src/models/anotacion';
import { Planificacion } from 'src/models/planificar_clase';

@Injectable({
  providedIn: 'root'
})
export class AnotacionService {

  private baseUrl = 'http://localhost:3000/api/anotacion'; // Corregir la URL base

  constructor(private http: HttpClient) {}

  guardar_Anotacion(anotacion: Anotacion): Observable<any> {
    return this.http.post<any>(this.baseUrl, anotacion);
  }
  obtener_Anotacion_Apoderado(rut_apoderado: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${rut_apoderado}/anotaciones`);
  }
  modificar_Anotacion(_id:string, citacion:Anotacion):Observable<Anotacion>{
    return this.http.put<Anotacion>(`${this.baseUrl}/${_id}/modificar`, citacion);
  }
  eliminar_Anotacion(_id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${_id}/eliminar`);
  }
  obtener_Anotacion_ID(_id:string):Observable<Anotacion>{
    return this.http.get<Anotacion>(`${this.baseUrl}/${_id}/anotacion/buscar`)
  }
  obtener_Anotaciones_profesor(rut_prfosor:string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/anotacion/${rut_prfosor}`);
  }

}
