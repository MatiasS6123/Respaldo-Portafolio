import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IngresoService } from 'src/app/Service/ingreso.service';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/models/User';
import { Ingreso } from 'src/models/ingreso';

@Component({
  selector: 'app-registro-ingreso',
  templateUrl: './registro-ingreso.page.html',
  styleUrls: ['./registro-ingreso.page.scss'],
})
export class RegistroIngresoPage implements OnInit {

  ingreso:Ingreso={
    rut_usuario:'',
    nombre_usuario:'',
    fecha_ingreso:new Date,
    foto_ingreso:''
  };
  ingresoForm:FormGroup;
  files: { [key: string]: File } = {};
  constructor(private userService:UserService,private formBuilder:FormBuilder,private ingresoService:IngresoService, private toastController:ToastController) {
     
    this.ingresoForm=this.formBuilder.group({
      nombre_usuario:['',Validators.required],
      rut_usuario:['',Validators.required],
      fecha_ingreso:[new Date,Validators.required],
      foto_ingreso:['',Validators.required]

    })
    
   }

  ngOnInit() {
  
    this.getProfile();
  }

  patchValue(){
    this.ingresoForm.patchValue({
      nombre_usuario:this.ingreso?.nombre_usuario,
      rut_usuario:this.ingreso?.rut_usuario,
    })
  }

  getProfile() {
    this.userService.getUserInfo().subscribe(
      (usuario: User) => {
        this.ingreso.rut_usuario = usuario.rut;
        this.ingreso.nombre_usuario = usuario.nombre;
        this.patchValue();
      },
      (error) => {
        console.error('Error al obtener la información del usuario:', error);
      }
    );
  }

  guardar_Ingreso(){
    if(this.ingresoForm.valid){

      const fechaActual = new Date().toISOString().split('T')[0];
  
      const ingresoUsuarioData = {
        ...this.ingresoForm.value,
        fecha_ingreso: fechaActual
      };
      console.log("Datos a guardar",ingresoUsuarioData)
   
      if(this.files['foto_ingreso']){
        const file = this.files['foto_ingreso'];
        this.ingreso=ingresoUsuarioData;
        this.ingresoService.Guardar_Ingreso(this.ingreso,file).subscribe(
          (res) => {
            console.log('Ingreso guardado correctamente:', res);
            this.presentToast("Ingreso registrado con éxito");
            this.ingresoForm.reset();
            this.files = {}; // Reinicia los archivos después de guardar
          },
          (error) => {
            console.error('Error al guardar estudiante:', error);
            this.presentToast("Error al registrar al estudiante, verifique el RUT o la información");
          }
        )

      }
    
    }
    else{
      this.presentToast("Porfavor Complete los todos los campos del formulario")
    }

  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  onFileChange(event, field) {
    if (event.target.files.length > 0) {
      this.files[field] = event.target.files[0];
    }
  }


}
