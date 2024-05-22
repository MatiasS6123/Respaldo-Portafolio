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

  GuardarSalida(SalidaEstudiante: SalidaEstudiante, fotoSalida: File, fotoCedula: File): Observable<SalidaEstudiante> {
    const formData = new FormData();
    Object.keys(SalidaEstudiante).forEach(key => {
      formData.append(key, SalidaEstudiante[key]);
    });
    formData.append('foto_salida', fotoSalida);
    formData.append('foto_cedula_quien_retira', fotoCedula);

    // Asegúrate de que estás enviando el objeto FormData sin convertirlo a JSON
    return this.http.post<SalidaEstudiante>(this.baseUrl, formData);
}

}
