import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { AnotacionService } from 'src/app/Service/anotacion.service';
import { GestionCService } from 'src/app/Service/gestion-c.service';
import { Anotacion } from 'src/models/anotacion';
import { Citacion } from 'src/models/citacion';
import { GestionCurso } from 'src/models/gestionC';

@Component({
  selector: 'app-gestion-anotacion',
  templateUrl: './gestion-anotacion.component.html',
  styleUrls: ['./gestion-anotacion.component.scss'],
})
export class GestionAnotacionComponent  implements OnInit {
  estado:boolean=false;
  anotacion:Anotacion
  anotacionForm:FormGroup;
  gestionCurso:GestionCurso;
  mostrarInformacionAnotacion: boolean = false;

  constructor(private formBuilder: FormBuilder, private route:ActivatedRoute,private anotacionService:AnotacionService,private gestionCService:GestionCService,private toastControler:ToastController,private alertControler:AlertController,
    private navController:NavController
  ) {
      this.anotacionForm=this.formBuilder.group({
      tipo_anotacion:['',Validators.required],
      nombre_curso:['',Validators.required],
      nombre_asignatura:['',Validators.required],
      fecha_anotacion:[new Date,Validators.required],
      nombre_profesor:['',Validators.required],
      rut_profesor:['',Validators.required],
      nombre_alumnos:[[],Validators.required],
      nuevo_nombre_alumnos:[[]],
      descripcion_anotacion:['',Validators.required],
      mostrarEstudiantes: [false]
    
    })
    this.anotacionForm.disable();

   }

  ngOnInit() {
    const _id = this.route.snapshot.paramMap.get("_id");
    this.anotacionService.obtener_Anotacion_ID(_id).subscribe(
      (anotacion)=>{
        this.anotacion=anotacion;
        console.log(anotacion)
        this.mostrarInformacionAnotacion=false;
        this.patchValue();
      }
      
    )
    this.anotacionForm.get("nuevo_nombre_alumnos").valueChanges.subscribe(
      (nuevosAlumnos)=>{
        const alumnosSeleccionados = this.anotacionForm.get('nombre_alumnos').value;
        alumnosSeleccionados.push(...nuevosAlumnos);
      
      // Actualiza el primer select
      this.anotacionForm.patchValue({
        nombre_alumnos: alumnosSeleccionados
      });
      }
    )
 
  }



  patchValue(){
    console.log("Anotación antes del parcheo:", this.anotacion);
    const date=this.formatDate(this.anotacion.fecha_anotacion)
    this.anotacionForm.patchValue({
      tipo_anotacion:this.anotacion.tipo_anotacion,
      nombre_curso:this.anotacion.nombre_curso,
      nombre_asignatura:this.anotacion.nombre_asignatura,
      fecha_anotacion:date,
      nombre_profesor:this.anotacion.nombre_profesor,
      rut_profesor:this.anotacion.rut_profesor,
      nombre_alumnos:this.anotacion.nombre_alumnos,
      descripcion_anotacion:this.anotacion.descripcion_anotacion


    })
    console.log("Formulario después del parcheo:", this.anotacionForm.value); 
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


  modificar_Anotacion(){
    const _id=this.anotacion._id;
    console.log(_id)
    const nuevaData: Anotacion = {
      tipo_anotacion: this.anotacionForm.get('tipo_anotacion').value,
      nombre_curso: this.anotacionForm.get('nombre_curso').value,
      nombre_asignatura: this.anotacionForm.get('nombre_asignatura').value,
      fecha_anotacion: this.anotacionForm.get('fecha_anotacion').value,
      nombre_profesor: this.anotacionForm.get('nombre_profesor').value,
      rut_profesor: this.anotacionForm.get('rut_profesor').value,
      nombre_alumnos:this.anotacionForm.get('nombre_alumnos').value,
      descripcion_anotacion:this.anotacionForm.get('descripcion_anotacion').value

    };
    console.log(nuevaData)
    this.anotacionService.modificar_Anotacion(_id,nuevaData).subscribe(
      ()=>{
        this.presentToast("Datos actualizados");
        this.anotacionForm.disable();
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
  async eliminar_Anotacion(){
    const _id=this.anotacion._id;
    const result= await this.presentConfirm();
    if(result){
      this.anotacionService.eliminar_Anotacion(_id).subscribe(
        ()=>{
          this.presentToast("Anotación eliminada con exito").then(() => {
            setTimeout(() => {
              this.navController.navigateBack(['/lista-anotacion-apoderado']);
            }, 2000); // Espera 2 segundos antes de navegar hacia atrás
          });
          

        }
      )
    }
    

  }

  cancelar_Edicion(){
    this.estado=false;
    this.anotacionForm.disable();
    this.mostrarInformacionAnotacion=false;
  }
  habilitar_Edicion(){
    this.estado=true;
    this.anotacionForm.enable();
    this.mostrarInformacionAnotacion=true;
  }

  obtener_Estudiante(){
    const nombreCurso=this.anotacion.nombre_curso;
    this.gestionCService.getCursoByNombre(nombreCurso).subscribe(
      (curso)=>{
        this.gestionCurso=curso;
        console.log(curso)
      }
    )
  }
  getEstudiantesNoSeleccionados() {
    const alumnosSeleccionados = this.anotacionForm.get('nombre_alumnos').value;
    return this.gestionCurso?.alumno.filter(estudiante => !alumnosSeleccionados.some(alumno => alumno.nombre === estudiante.nombre));
  }
  
 
  async presentConfirm(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertControler.create({
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
