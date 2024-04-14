import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bitacora } from 'src/models/bitacora';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  private baseUrl = 'http://localhost:3000/api/bitacora'; // Corregir la URL base

  constructor(private http: HttpClient) {}

  guardarBitacora(bitacora:Bitacora):Observable<any>{
    return this.http.post<any>(this.baseUrl,bitacora);
  }
}
