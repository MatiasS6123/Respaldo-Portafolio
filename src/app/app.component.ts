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
  userRole: string;
  roleSubscription: Subscription | undefined; // Subscription para el método checkRole()

  constructor(public authService: UserService, private router: Router) { }

  ngOnInit() {
    // Verificar el estado de autenticación al inicializar el componente
    this.isLoggedIn = this.authService.isAuthenticated();

    if (this.isLoggedIn) {
      // Suscribirse al método checkRole() y actualizar userRole cuando se resuelva
      this.roleSubscription = this.authService.checkRole().subscribe(role => {
        console.log('Rol del usuario:', role);
        this.userRole = role;
      });
    }
  }

  ngOnDestroy() {
    // Limpiar la suscripción para evitar posibles pérdidas de memoria
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userRole = '';
    this.router.navigate(['/login']).then(() => {
      // Después de redirigir, recarga la página
      window.location.reload();
    });
  }

}
