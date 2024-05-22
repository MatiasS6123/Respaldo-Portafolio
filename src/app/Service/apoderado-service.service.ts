import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apoderado } from 'src/models/apoderado';

@Injectable({
  providedIn: 'root'
})
export class ApoderadoServiceService {

  private baseUrl = 'http://localhost:3000/api/apoderado'; // Corregir la URL base
  constructor(private http:HttpClient) { }

  guardar_Apoderado(apoderado:Apoderado): Observable<any>{
    return this.http.post<any>(this.baseUrl,apoderado)

  }
  buscar_Apoderado(_id:string):Observable<Apoderado>{
    return this.http.get<Apoderado>(`${this.baseUrl}/${_id}/apoderado`);

  }
  modificar_Apoderado(_id:string,apoderado:Apoderado):Observable<Apoderado>{
    return this.http.put<Apoderado>(`${this.baseUrl}/${_id}/modificar`, apoderado);
  }
  eliminar_Apoderado(_id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${_id}/eliminar`);
  }
  get_Apoderado(): Observable<Apoderado[]> {
    return this.http.get<Apoderado[]>(this.baseUrl);
  }

}
