import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Router } from 'express';
import { BitacoraService } from 'src/app/Service/bitacora.service';
import { GestionCService } from 'src/app/Service/gestion-c.service';
import { UserService } from 'src/app/Service/user.service';
import { Bitacora } from 'src/models/bitacora';
import { GestionCurso } from 'src/models/gestionC';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss'],
})
export class BitacoraComponent implements OnInit {

  asignaturas: string[] = ['Matemáticas'];
  asignaturaSeleccionada: string = '';
  bitacoraForm: FormGroup;
  gestionCurso: GestionCurso;
  rut_profesor:string;
  nombre_profesor:string;
  bitacora:Bitacora={
    _id:'',
    nombreCurso:'',
    nombreAsignatura:'',
    nombreProfesor:'',
    rutProfesor:'',
    fecha:new Date,
    descripcion:''    
  }

  constructor(
    private formBuilder: FormBuilder,
    private bitacoraService: BitacoraService,
    private toastController: ToastController,
    private gestioC:GestionCService,
    private route:ActivatedRoute,
    private userService:UserService

  ) { }

  ngOnInit(): void {
    const nombreCurso = this.route.snapshot.paramMap.get('nombreCurso');
    console.log('ID del curso recibido:', nombreCurso);
    this.gestioC.getCursoByNombre(nombreCurso).subscribe(
      (curso) => {
        this.gestionCurso = curso;
        console.log("Datos recogidos de asistencia ", curso)
      }
    )
    this.getProfile();
  }


  registrar_bitacora(){
    const informacionBitacora:Bitacora={
      nombreCurso:this.gestionCurso.nombreCurso,
      nombreAsignatura:this.bitacora.nombreAsignatura,
      nombreProfesor:this.nombre_profesor,
      rutProfesor:this.rut_profesor,
      fecha:this.bitacora.fecha,
      descripcion:this.bitacora.descripcion
    }

    console.log("Informacion bitacora",informacionBitacora)

    this.bitacoraService.guardarBitacora(informacionBitacora).subscribe((bitacora)=>{
      
      this.presentToast("Bitacora GuardadaExitosamente")
    })
  }
  
  
  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  

  getProfile(){
    this.userService.getUserInfo().subscribe(
      (usuario)=>{
        this.rut_profesor=usuario.rut;
        this.nombre_profesor=usuario.nombre;
      }
    )
  }
  

}
