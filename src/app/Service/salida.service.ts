import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante } from 'src/models/Estudiante';
import { SalidaEstudiante } from 'src/models/salidaEstudiante';

@Injectable({
  providedIn: 'root'
})
export class SalidaService {
  private baseUrl = 'http://localhost:3000/api/salida'

  constructor(private http:HttpClient) { }

  GuardarSalida(SalidaEstudiante: SalidaEstudiante): Observable<SalidaEstudiante> {
    return this.http.post<SalidaEstudiante>(this.baseUrl, SalidaEstudiante);
  }
}
