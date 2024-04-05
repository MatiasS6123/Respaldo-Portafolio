import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/models/User';
import { Storage } from '@ionic/storage-angular'; // Importa Storage desde '@ionic/storage-angular'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api/users';

  
  constructor(private http: HttpClient) { 
    
  }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }
 
}
