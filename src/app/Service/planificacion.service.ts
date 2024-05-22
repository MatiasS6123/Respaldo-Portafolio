import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Planificacion } from 'src/models/planificar_clase';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionService {
  private baseUrl='http://localhost:3000/api/planificacion'

  constructor(private http:HttpClient) { }
  guardar_Planificacion(planificacion: Planificacion):Observable<any> {
    return this.http.post<any>(this.baseUrl, planificacion);
  }
  obtener_Planificacion(rut_profesor:string):Observable<Planificacion[]>{
    return this.http.get<Planificacion[]>(`${this.baseUrl}/${rut_profesor}/planificacion`)
  }
  obtener_Planificacion_ID(_id:string):Observable<Planificacion>{
    return this.http.get<Planificacion>(`${this.baseUrl}/${_id}/planifica`)
  }
  modificar_planificacion(_id: string, planificacion: Planificacion): Observable<Planificacion> {
    return this.http.put<Planificacion>(`${this.baseUrl}/planificacion/${_id}`, planificacion);
  }
  eliminar_Planificacion(_id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/planificacion/${_id}/eliminar`)

  }
}
