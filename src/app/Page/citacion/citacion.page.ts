import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CitacionService } from 'src/app/Service/citacion.service';
import { GestionCService } from 'src/app/Service/gestion-c.service';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/models/User';
import { Citacion } from 'src/models/citacion';
import { GestionCurso } from 'src/models/gestionC';

@Component({
  selector: 'app-citacion',
  templateUrl: './citacion.page.html',
  styleUrls: ['./citacion.page.scss'],
})
export class CitacionPage implements OnInit {

  rut_profesor:string
  nombre_profesor:string
  gestionCurso:GestionCurso
  citacion:Citacion={
    titulo_citacion:'',
    nombre_curso:'',
    estudiante:[],
    rut_profesor:'',
    nombre_profesor:'',
    lugar_citacion:'',
    fecha_citacion:new Date,
    estado_citacion:'',
    descripcion_citacion:''

  };
  

  constructor(private citacionService:CitacionService,private userService:UserService,
    private gestionCService:GestionCService,private route:ActivatedRoute,
    private toastController:ToastController
  ) { }

  ngOnInit() {
    const nombreCurso = this.route.snapshot.paramMap.get('nombreCurso')
    console.log('ID del curso recibido:', nombreCurso);
    this.gestionCService.getCursoByNombre(nombreCurso).subscribe(
      (curso)=>{
        this.gestionCurso=curso;
        console.log("cursos ", curso)
        this.citacion.nombre_curso=curso.nombreCurso;
        this.obtenerProfile();

      },
      (error) => {
        console.error('Error al obtener información del curso:', error);
        // Maneja el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
      }
    )
  
  }

  guardarCitacion(){
    const nombre_curso=this.gestionCurso.nombreCurso;
    const informacionCitacion:Citacion={
      titulo_citacion:this.citacion.titulo_citacion,
      nombre_curso:nombre_curso,
      estudiante:this.citacion.estudiante,
      rut_profesor:this.rut_profesor,
      nombre_profesor:this.nombre_profesor,
      lugar_citacion:this.citacion.lugar_citacion,
      fecha_citacion:this.citacion.fecha_citacion,
      estado_citacion:this.citacion.estado_citacion,
      descripcion_citacion:this.citacion.descripcion_citacion


    }
    console.log("Datos", informacionCitacion)
    this.citacionService.guardar_Citacion(informacionCitacion).subscribe(
      ()=>{
        this.presentToast("Datos guardados")
        this.citacion={
          titulo_citacion:'',
          nombre_curso:'',
          estudiante:[],
          rut_profesor:'',
          nombre_profesor:'',
          lugar_citacion:'',
          fecha_citacion:new Date,
          estado_citacion:'',
          descripcion_citacion:''
      
        };
        

      }
    )
    
  }

  obtenerProfile(){
    this.userService.getUserInfo().subscribe(
      (usuario:User)=>{
        this.rut_profesor=usuario.rut;
        this.nombre_profesor=usuario.nombre;
        console.log("Datos",this.citacion.rut_profesor,this.citacion.nombre_profesor)
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
  submit(){
    console.log("Datos",this.citacion)
  }

}
