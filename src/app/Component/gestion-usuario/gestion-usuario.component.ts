import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.scss'],
})
export class GestionUsuarioComponent implements OnInit {

  userForm!: FormGroup;
  buscarForm!: FormGroup;
  usuarioEncontrado: User | null = null;
  mostrarInformacionUsuario: boolean = false;
  edicionHabilitada: boolean = false; // Variable para habilitar o deshabilitar la edición

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastController: ToastController) { }

  ngOnInit() {
    this.initEstudianteForm();
    this.initBuscarForm();
  }

  private initEstudianteForm(): void {
    this.userForm = this.formBuilder.group({
      rut: [{value: '', disabled: true}, [Validators.required]],
      nombre: [{value: '', disabled: true}, Validators.required],
      apellido: [{value: '', disabled: true}, Validators.required],
      edad: [{value: '', disabled: true}, [Validators.required, Validators.min(0), Validators.max(120)]],
      tipo_usuario: [{value: '', disabled: true}, Validators.required],
      email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
      password: [{value: '', disabled: true}, [Validators.required, Validators.minLength(6)]]
    });
  }

  private initBuscarForm(): void {
    this.buscarForm = this.formBuilder.group({
      rut: ['', [Validators.required]]
    });
  }

  buscarUsuario() {
    this.userService.buscarUser(this.buscarForm.get('rut')?.value).subscribe(
      (usuario: any) => {
        console.log('Usuario encontrado:', usuario);

        if (usuario) {
          this.usuarioEncontrado = usuario;
          this.mostrarInformacionUsuario = true;
          this.userForm.patchValue(usuario); // Asignar los datos del usuario al formulario
          this.userForm.disable(); // Deshabilitar todos los campos del formulario
        } else {
          console.error('Usuario no encontrado');
          this.usuarioEncontrado = null;
          this.mostrarInformacionUsuario = false;
        }
      },
      (error) => {
        this.presentToast("Rut inválido o no encontrado")
        console.error('Error al buscar usuario:', error);
      }
    );
  }

  habilitarEdicion() {
    this.userForm.enable(); 
    this.edicionHabilitada=true;// Habilitar todos los campos del formulario
  }

  eliminarUsuario() {
    const rut = this.userForm.get('rut')?.value;
    if (!rut) {
      this.presentToast('No se proporcionó un RUT válido para eliminar el estudiante');
      return;
    }

    this.userService.eliminarUser(rut).subscribe(
      () => {
        this.presentToast('Usuario eliminado correctamente');
        this.usuarioEncontrado = null;
        this.mostrarInformacionUsuario = false;
        this.userForm.reset();
      },
      (error) => {
        this.presentToast("Error al eliminar usuario")
        console.error('Error al eliminar usuario:', error);
      }
    );
  }

  actualizarUsuario() {
    if (this.userForm.invalid) {
      this.presentToast('El formulario es inválido. Corrige los campos resaltados.');
      return;
    }

    const usuarioActualizado: User = this.userForm.value;
    this.userService.modificarUser(usuarioActualizado.rut, usuarioActualizado).subscribe(
      (usuario: User) => {
        this.presentToast('Usuario actualizado correctamente:');
        this.usuarioEncontrado = usuario;
        // Puedes realizar alguna acción adicional después de actualizar el usuario, si es necesario
        this.userForm.disable();
      },
      (error) => {
        console.error('Error al actualizar usuario:', error);
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
