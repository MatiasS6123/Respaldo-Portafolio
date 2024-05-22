import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ApoderadoServiceService } from 'src/app/Service/apoderado-service.service';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { UserService } from 'src/app/Service/user.service';
import { Estudiante } from 'src/models/Estudiante';
import { User } from 'src/models/User';
import { Apoderado } from 'src/models/apoderado';

@Component({
  selector: 'app-gestion-apoderado',
  templateUrl: './gestion-apoderado.component.html',
  styleUrls: ['./gestion-apoderado.component.scss'],
})
export class GestionApoderadoComponent  implements OnInit {
  apoderadoForm!: FormGroup;
  edicionHabilitada: boolean = false;
  apoderado:Apoderado;
  estado:boolean=false;
  mostrarInformacionApoderado: boolean = false;

  constructor(private formBuilder: FormBuilder,private apoderadoService:ApoderadoServiceService,private userService:UserService, private estudianteService:EstudianteService,private toastControler:ToastController,
    private route:ActivatedRoute, private alertController:AlertController,private navCtrl:NavController
  ) { 
    this.initApoderadoForm();

  }

  ngOnInit() {

    const _id= this.route.snapshot.paramMap.get('_id');
    this.apoderadoService.buscar_Apoderado(_id).subscribe(
      (apoderado)=>{
        this.apoderado=apoderado;
        console.log(apoderado)
        this.mostrarInformacionApoderado=false;
        this.patchValue();
        
      }
    )

  }
  private initApoderadoForm(): void {

    this.apoderadoForm=this.formBuilder.group({
      rut_apoderado:['',Validators.required],
      nombre_apoderado:['',Validators.required],
      apellido_apoderado:['',Validators.required],
      edad_apoderado:[0,Validators.required],
      sexo_apoderado:['',Validators.required],
      parentesco:['',Validators.required],
      numero_contacto_apoderado:['',Validators.required],
      email_contacto_apoderado:['',Validators.email],
      rut_estudiante:['',Validators.required],
      nombre_estudiante:['',Validators.required]
    })

  }

  patchValue(){
    this.apoderadoForm.patchValue({
      rut_apoderado:this.apoderado.rut_apoderado,
      nombre_apoderado:this.apoderado.nombre_apoderado,
      apellido_apoderado:this.apoderado.apellido_apoderado,
      edad_apoderado:this.apoderado.edad_apoderado,
      sexo_apoderado:this.apoderado.sexo_apoderado,
      parentesco:this.apoderado.parentesco,
      numero_contacto_apoderado:this.apoderado.numero_contacto_apoderado,
      email_contacto_apoderado:this.apoderado.email_contacto_apoderado,
      rut_estudiante:this.apoderado.rut_estudiante,
      nombre_estudiante:this.apoderado.nombre_estudiante


    });
  
  }

  modificar_Apoderado(){
    const _id=this.apoderado._id;
    
    const usuarioActualizado=this.apoderadoForm.value;
    console.log(usuarioActualizado)
    this.apoderadoService.modificar_Apoderado(_id,usuarioActualizado).subscribe(
      ()=>{
        this.presentToast("Apoderado actualizado")
      }
      
    )
  
  }
  async eliminar_Apoderado(){
    const _id =this.apoderado._id;

    const result=await this.presentConfirm();
    if(result){
      this.apoderadoService.eliminar_Apoderado(_id).subscribe(
        ()=>{
          this.presentToast("Anotación eliminada con exito").then(() => {
            setTimeout(() => {
              this.navCtrl.navigateBack(['/lista-apoderado']);
            }, 2000); // Espera 2 segundos antes de navegar hacia atrás
          });
        }
      )
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastControler.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async presentConfirm(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: '¿Estás seguro de que quieres eliminar esta planificacion?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancelado');
              resolve(false);
            }
          }, {
            text: 'Eliminar',
            handler: () => {
              console.log('Eliminado');
              // Aquí puedes poner el código para eliminar el elemento
              resolve(true);
            }
          }
        ]
      });
  
      await alert.present();
    });
  }
  


  
  habilitarEdicion() {
    this.apoderadoForm.enable();
    this.estado = true; // Habilitar todos los campos del formulario
    this.mostrarInformacionApoderado=true;
  }
  cancelar_Edicion(){
    this.apoderadoForm.disable();
    this.estado=false;
    this.mostrarInformacionApoderado=false;

  }

}
