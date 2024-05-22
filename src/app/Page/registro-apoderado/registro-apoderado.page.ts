import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApoderadoServiceService } from 'src/app/Service/apoderado-service.service';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { UserService } from 'src/app/Service/user.service';
import { Estudiante } from 'src/models/Estudiante';
import { User } from 'src/models/User';
import { Apoderado } from 'src/models/apoderado';

@Component({
  selector: 'app-registro-apoderado',
  templateUrl: './registro-apoderado.page.html',
  styleUrls: ['./registro-apoderado.page.scss'],
})
export class RegistroApoderadoPage implements OnInit {

  alumnos: { nombre_estudiante: string, rut_estudiante: string }[] = [];
  apoderadoFom:FormGroup;
  apoderado:Apoderado

  constructor(private userService:UserService,private apoderadoService:ApoderadoServiceService,
    private estudianteService:EstudianteService,
    private formBuilder: FormBuilder,private toastController:ToastController
   ) {
    this.apoderadoFom=this.formBuilder.group({
      rut_apoderado:['',Validators.required],
      nombre_apoderado:['',Validators.required],
      apellido_apoderado:['',Validators.required],
      edad_apoderado:[0,Validators.required],
      sexo_apoderado:['',Validators.required],
      parentesco:['',Validators.required],
      numero_contacto_apoderado:['',Validators.required],
      email_contacto_apoderado:['',Validators.email],
      rut_alumno:['',Validators.required]
    })

    }
  
  ngOnInit() {
    this.obtenerEstudiante();
    
  }

  guardarApoderado(){
    if(this.apoderadoFom.valid){
      const formData = this.apoderadoFom.value;

      const apoderado:Apoderado={
        rut_apoderado:formData.rut_apoderado,
        nombre_apoderado:formData.nombre_apoderado,
        apellido_apoderado:formData.apellido_apoderado,
        edad_apoderado:formData.edad_apoderado,
        sexo_apoderado:formData.sexo_apoderado,
        parentesco:formData.parentesco,
        numero_contacto_apoderado:formData.numero_contacto_apoderado,
        email_contacto_apoderado:formData.email_contacto_apoderado,
        rut_estudiante: formData.rut_alumno.rut,
        nombre_estudiante: formData.rut_alumno.nombre


      }
      
      this.apoderadoService.guardar_Apoderado(apoderado).subscribe(()=>{

        this.presentToast("Apoderado Registrado");
        this.apoderadoFom.reset();
        

      },
      (error) => {
        console.error('Error al guardar el apoderado:', error);
        this.presentToast("Error al guardar el apoderado");

      }
    )

    }else{

    }
  }

  obtenerEstudiante(){
    this.estudianteService.getEstudiantes().subscribe(
      (estudiantes: Estudiante[]) => {
        this.alumnos = estudiantes.map(estudiante => ({
          nombre_estudiante: `${estudiante.nombre} ${estudiante.apellido}`,
          rut_estudiante: estudiante.rut
        }));
      },
      (error) => {
        console.error('Error al obtener estudiantes:', error);
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
