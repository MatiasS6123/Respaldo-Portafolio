import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {}

  login() {
    // Verificar si se han proporcionado correo electrónico y contraseña
    if (!this.email || !this.password) {
      // Mostrar mensaje de error si faltan correo electrónico o contraseña
      this.presentToast('Por favor ingresa tu correo electrónico y contraseña.');
      return;
    }
  
    // Depurar: Imprimir los valores de correo electrónico y contraseña
    console.log('Email:', this.email);
    console.log('Contraseña:', this.password);
  
    // Enviar solicitud de inicio de sesión al servicio
    this.userService.login(this.email, this.password).subscribe(
      (response) => {
        // Manejar respuesta del servicio (por ejemplo, guardar token)
        const token = response.token;
        localStorage.setItem('token', token);
        
        // Redirigir a la página principal o a la página deseada
        this.router.navigate(['']);
      },
      (error) => {
        // Manejar error de inicio de sesión (por ejemplo, mostrar mensaje de error)
        console.error('Error en el inicio de sesión:', error);
        // Mostrar mensaje de error
        this.presentToast('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
