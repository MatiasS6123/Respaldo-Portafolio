import { Component, OnInit } from '@angular/core';
import { UserService } from './Service/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isAdminSubscription: Subscription | undefined; // Subscription para el método isAdmin()

  constructor(public authService: UserService, private router:Router) { }

  ngOnInit() {
    // Verificar el estado de autenticación al inicializar el componente
    this.isLoggedIn = this.authService.isAuthenticated();
    
    if (this.isLoggedIn) {
      // Suscribirse al método isAdmin() y actualizar isAdmin cuando se resuelva
      this.isAdminSubscription = this.authService.isAdmin().subscribe(isAdmin => {
        console.log('isAdmin:', isAdmin);
        this.isAdmin = isAdmin;
      });
    }
  }

  ngOnDestroy() {
    // Limpiar la suscripción para evitar posibles pérdidas de memoria
    if (this.isAdminSubscription) {
      this.isAdminSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.router.navigate(['/login']);
  }
}
