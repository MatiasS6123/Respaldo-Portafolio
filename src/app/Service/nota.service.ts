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
}
