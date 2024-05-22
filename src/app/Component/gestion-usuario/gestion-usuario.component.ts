import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.scss'],
})
export class GestionUsuarioComponent implements OnInit {

  userForm!: FormGroup;
  mostrarInformacionUsuario: boolean = false;
  edicionHabilitada: boolean = false; // Variable para habilitar o deshabilitar la edición

  usuario:User;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastController: ToastController,
    private route:ActivatedRoute,private navCtr:NavController
  ) {
    this.initEstudianteForm();

   }

  ngOnInit() {
    const _id=this.route.snapshot.paramMap.get('_id');
    this.userService.buscar_Usuario(_id).subscribe(
      (usuario)=>{
        this.usuario=usuario;
        console.log(_id)
        this.patchValue();
        this.edicionHabilitada=false;
        this.mostrarInformacionUsuario=false;
      }
    )

  
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

  
  patchValue() {
    this.userForm.patchValue({
      rut:this.usuario.rut,
      nombre:this.usuario.nombre,
      apellido:this.usuario.apellido,
      edad:this.usuario.edad,
      tipo_usuario:this.usuario.tipo_usuario,
      email:this.usuario.email


    })
    
  }

  habilitarEdicion() {
    this.userForm.enable(); 
    this.edicionHabilitada=true;// Habilitar todos los campos del formulario
    this.mostrarInformacionUsuario=true;
  }
  desabilitarEdicion(){
    this.userForm.disable();
    this.edicionHabilitada=false;
    this.mostrarInformacionUsuario=false;
  }

  eliminarUsuario() {
    

    const _id = this.usuario._id;
    this.userService.eliminar_User(_id).subscribe(
      () => {
        this.presentToast("Anotación eliminada con exito").then(() => {
          setTimeout(() => {
            this.navCtr.navigateBack(['/lista-usuario']);
          }, 2000); // Espera 2 segundos antes de navegar hacia atrás
        });      },
      (error) => {
        this.presentToast("Error al eliminar usuario")
        console.error('Error al eliminar usuario:', error);
      }
    );
  }

  actualizarUsuario() {
   
    const _id= this.usuario._id;
    const usuarioActualizado: User = this.userForm.value;
    this.userService.modificar_User(_id, usuarioActualizado).subscribe(
      (usuario: User) => {
        this.presentToast('Usuario actualizado correctamente:');
        
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
