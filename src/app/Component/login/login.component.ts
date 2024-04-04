import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  email!: string;
  password!: string;

  constructor(private userService: UserService, private toastController: ToastController) {}

  login() {
    const credentials = { email: this.email, password: this.password };
    console.log('Credenciales:', credentials); // Agregar esta línea para depuración
    this.userService.loginUser(credentials).subscribe(response => {
      // Manejar la respuesta del servidor, por ejemplo, guardar el token en el almacenamiento local
      const token = response.token;
      localStorage.setItem('token', token);
      // Redirigir a la página principal u otra página deseada
    }, error => {
      // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      this.presentToast('Error al iniciar sesión. Por favor, revisa tus credenciales e intenta de nuevo.');
    });
  }
  

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
  ngOnInit() {}

}
