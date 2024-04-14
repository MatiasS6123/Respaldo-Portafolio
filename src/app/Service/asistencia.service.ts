import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asistencia } from 'src/models/asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  
  private baseUrl = 'http://localhost:3000/api/asistencia'; // Corregir la URL base

  constructor(private http: HttpClient) {}

  guardarAsistencia(asistencia: Asistencia): Observable<any> {
    return this.http.post<any>(this.baseUrl, asistencia);
  }

}
