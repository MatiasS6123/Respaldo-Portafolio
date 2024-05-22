import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingreso } from 'src/models/ingreso';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  private baseUrl = 'http://localhost:3000/api/ingreso'
  constructor(private http:HttpClient) { }

  Guardar_Ingreso(ingreso_Usuario: Ingreso, foto_ingreso: File): Observable<Ingreso> {
    const formData = new FormData();
    Object.keys(ingreso_Usuario).forEach(key => {
      formData.append(key, ingreso_Usuario[key]);
    });
    formData.append('foto_ingreso', foto_ingreso);

    // Asegúrate de que estás enviando el objeto FormData sin convertirlo a JSON
    return this.http.post<Ingreso>(this.baseUrl, formData);
}

}
