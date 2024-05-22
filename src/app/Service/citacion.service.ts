import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Citacion } from 'src/models/citacion';

@Injectable({
  providedIn: 'root'
})
export class CitacionService {

  private baseUrl = 'http://localhost:3000/api/citacion'; // Corregir la URL base
  constructor(private http:HttpClient) { }

  guardar_Citacion(citacion:Citacion):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/citaciones`,citacion)
  }
  obtener_Citacion(rut_apoderado: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${rut_apoderado}/citaciones`);
  }
  obtener_Citacion_Profesor(rut_profesor:string): Observable<any>{
    return this.http.get(`${this.baseUrl}/citaciones/${rut_profesor}`);
  }
  modificar_Citacion(_id:string, citacion:Citacion):Observable<Citacion>{
    return this.http.put<Citacion>(`${this.baseUrl}/${_id}/modificar`, citacion);
  }
  eliminar_Citacion(_id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${_id}/eliminar`);
  }

  obtener_Citacion__ID(_id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${_id}/buscar`);
  }


}
