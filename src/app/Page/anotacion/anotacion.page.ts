import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AnotacionService } from 'src/app/Service/anotacion.service';
import { GestionCService } from 'src/app/Service/gestion-c.service';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/models/User';
import { Anotacion } from 'src/models/anotacion';
import { GestionCurso } from 'src/models/gestionC';

@Component({
  selector: 'app-anotacion',
  templateUrl: './anotacion.page.html',
  styleUrls: ['./anotacion.page.scss'],
})
export class AnotacionPage implements OnInit {

  gestionCurso:GestionCurso;
  user:User
  nombreProfesor: string ;
  rutProfesor: string ;

  anotacion:Anotacion={
    _id:'',
    nombre_curso:'',
    tipo_anotacion:'',
    nombre_asignatura:'',
    fecha_anotacion:new Date,
    nombre_alumnos:[],
    nombre_profesor:'',
    rut_profesor:'',
    descripcion_anotacion:''
  }

  constructor(private route:ActivatedRoute,
    private gestionCService:GestionCService,
    private anotacionService:AnotacionService,
    private toastController:ToastController,
    private authService:UserService
  ) { }

  ngOnInit() {
    const nombreCurso = this.route.snapshot.paramMap.get('nombreCurso')
    console.log('ID del curso recibido:', nombreCurso);
    this.gestionCService.getCursoByNombre(nombreCurso).subscribe(
      (curso)=>{
        this.gestionCurso=curso;
        console.log("Datos curso",curso)

      },
      (error) => {
        console.error('Error al obtener información del curso:', error);
        // Maneja el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
      }
    )
    this.obtenerProfile();
  }

  guardar_anotacion(){
    const alumno= this.anotacion.nombre_alumnos;
    const informacionAnotacion:Anotacion={
      tipo_anotacion:this.anotacion.tipo_anotacion,
      nombre_curso:this.gestionCurso.nombreCurso ,
      nombre_asignatura:this.anotacion.nombre_asignatura,
      fecha_anotacion:new Date,
      nombre_profesor:this.nombreProfesor,
      rut_profesor:this.rutProfesor,
      nombre_alumnos:alumno,
      descripcion_anotacion:this.anotacion.descripcion_anotacion
    }
    console.log("DAtos a guardar",informacionAnotacion)
    this.anotacionService.guardar_Anotacion(informacionAnotacion).subscribe(
      ()=>{
        this.presentToast("Anotacion guardada exitosamente");
        this.anotacion = {
          tipo_anotacion: '',
          nombre_curso: '',
          nombre_asignatura: '',
          fecha_anotacion: null,
          nombre_profesor: '',
          rut_profesor: '',
          nombre_alumnos: [],
          descripcion_anotacion: ''
        };
      },error => {
        if(error.status === 201){
          console.log("Asistencia guardada");
          this.anotacion = {
            _id: '',
            tipo_anotacion: '',
            nombre_curso: '',
            nombre_asignatura: '',
            fecha_anotacion: null,
            nombre_profesor: '',
            rut_profesor: '',
            nombre_alumnos: [],
            descripcion_anotacion: ''
          };
        }
      }
    )
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  obtenerProfile() {
    this.authService.getUserInfo().subscribe(
      (usuario: User) => {
        // Asigna el nombre y rut del usuario a las variables correspondientes
        this.nombreProfesor = usuario.nombre;
        this.rutProfesor = usuario.rut;
        console.log(usuario); // Imprime la información del usuario obtenida
      }
    );
  }


}
