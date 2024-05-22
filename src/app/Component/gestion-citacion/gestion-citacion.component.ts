import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { CitacionService } from 'src/app/Service/citacion.service';
import { GestionCService } from 'src/app/Service/gestion-c.service';
import { Citacion } from 'src/models/citacion';
import { GestionCurso } from 'src/models/gestionC';

@Component({
  selector: 'app-gestion-citacion',
  templateUrl: './gestion-citacion.component.html',
  styleUrls: ['./gestion-citacion.component.scss'],
})
export class GestionCitacionComponent  implements OnInit {

  gestionCitacionForm:FormGroup;
  citacion:Citacion;
  estado:boolean;
  gestionCurso:GestionCurso;
  mostrarInformacionCitacion: boolean = false;
  constructor(private formBuilder:FormBuilder,private route:ActivatedRoute,private citacionService:CitacionService,private gestionSCurso:GestionCService,
    private alertController:AlertController,private navCtr:NavController,private toastControler:ToastController
  ) { 
      this.gestionCitacionForm=this.formBuilder.group({
        titulo_citacion:['',Validators.required],
        nombre_curso:['',Validators.required],
        estudiante:[[],Validators.required],
        nuevo_estudiante:[[]],
        mostrar_estudiante:[false],
        nombre_profesor:['',Validators.required],
        rut_profesor:['',Validators.required],
        lugar_citacion:['',Validators.required],
        fecha_citacion:[new Date,Validators.required],
        estado_citacion:['',Validators.required],
        descripcion_citacion:['',Validators.required]
      })
      this.gestionCitacionForm.disable();

  }

  ngOnInit() {
    const _id = this.route.snapshot.paramMap.get("_id");
    this.citacionService.obtener_Citacion__ID(_id).subscribe(
      (citacion)=>{
        this.citacion=citacion;
        console.log(citacion)
        this.patchValue();
        this.mostrarInformacionCitacion=false;

      }
    )
    this.gestionCitacionForm.get("nuevo_estudiante").valueChanges.subscribe(
      (nuevosAlumnos)=>{
        const alumnosSeleccionados = this.gestionCitacionForm.get('estudiante').value;
        alumnosSeleccionados.push(...nuevosAlumnos);
      
      // Actualiza el primer select
      this.gestionCitacionForm.patchValue({
        estudiante: alumnosSeleccionados
      });
      }
    )
  }

  patchValue(){
    console.log("Citación antes del parcheo:", this.citacion);
    const date=this.formatDate(this.citacion.fecha_citacion)
    this.gestionCitacionForm.patchValue({
      titulo_citacion:this.citacion.titulo_citacion,
      nombre_curso:this.citacion.nombre_curso,
      estudiante:this.citacion.estudiante,
      nombre_profesor:this.citacion.nombre_profesor,
      rut_profesor:this.citacion.rut_profesor,
      lugar_citacion:this.citacion.lugar_citacion,
      fecha_citacion:date,
      estado_citacion:this.citacion.estado_citacion,
      descripcion_citacion:this.citacion.descripcion_citacion
    })
    console.log("Formulario después del parcheo:", this.gestionCitacionForm.value); 
    this.obtener_Estudiante();
  }
  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
  
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
  
    return [year, month, day].join('-');
  }  

  obtener_Estudiante(){
    const nombreCurso=this.citacion.nombre_curso;
    this.gestionSCurso.getCursoByNombre(nombreCurso).subscribe(
      (curso)=>{
        this.gestionCurso=curso;
        console.log(curso)
      }
    )
  }
  getEstudiantesNoSeleccionados() {
    const alumnosSeleccionados = this.gestionCitacionForm.get('estudiante').value;
    return this.gestionCurso?.alumno.filter(estudiante => !alumnosSeleccionados.some(alumno => alumno.nombre === estudiante.nombre));
  }

 
  habilitar_Edicion(){
    this.estado=true;
    this.gestionCitacionForm.enable()
    this.mostrarInformacionCitacion=true;
  }
  cancelar_Edicion(){
    this.estado=false;
    this.gestionCitacionForm.disable();
    this.mostrarInformacionCitacion=false;
  }
  async eliminar_Citacion(){
    const _id= this.citacion._id;
    const result=await this.presentConfirm();
    if(result){
      this.citacionService.eliminar_Citacion(_id).subscribe(
        ()=>{
          this.presentToast("Anotación eliminada con exito").then(() => {
            setTimeout(() => {
              this.navCtr.navigateBack(['/lista-citacion']);
            }, 2000); // Espera 2 segundos antes de navegar hacia atrás
          });
        }
      )
    }

  }
  modificar_Citacion(){
    const _id =this.citacion._id;

    const nuevaData:Citacion={
      titulo_citacion:this.gestionCitacionForm.get('titulo_citacion').value,
      nombre_curso:this.gestionCitacionForm.get('nombre_curso').value,
      estudiante:this.gestionCitacionForm.get('estudiante').value,
      nombre_profesor:this.gestionCitacionForm.get('nombre_profesor').value,
      rut_profesor:this.gestionCitacionForm.get('rut_profesor').value,
      lugar_citacion:this.gestionCitacionForm.get('lugar_citacion').value,
      fecha_citacion:this.gestionCitacionForm.get('fecha_citacion').value,
      estado_citacion:this.gestionCitacionForm.get('estado_citacion').value,
      descripcion_citacion:this.gestionCitacionForm.get('descripcion_citacion').value

    }

    this.citacionService.modificar_Citacion(_id,nuevaData).subscribe(
      ()=>{
        this.presentToast("Datos actualizados");
        this.gestionCitacionForm.disable();
        this.estado=false

      }
    )

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
        message: '¿Estás seguro de que quieres eliminar esta Anotación?',
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


}
