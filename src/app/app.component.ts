import { Component, OnInit } from '@angular/core';
import { UserService } from './Service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  
  constructor(public authService: UserService) { 
  }

  ngOnInit() {
    // Verificar el estado de autenticación al inicializar el componente
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  // Método para cerrar sesión
  logout(): void {
    // Llama al método logout() del servicio UserService
    this.authService.logout();
    
    // Actualiza el estado de autenticación en este componente
    this.isLoggedIn = false;
  }
}
