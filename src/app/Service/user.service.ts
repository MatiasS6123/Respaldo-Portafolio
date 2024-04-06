import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  }

  logout(): void {
    // Borra el token almacenado en localStorage al cerrar sesión
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    // Verifica si hay un token almacenado en localStorage para determinar si el usuario está autenticado
    return localStorage.getItem('token') !== null;
  }
}
