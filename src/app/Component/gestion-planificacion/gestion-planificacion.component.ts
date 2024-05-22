import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { PlanificacionService } from 'src/app/Service/planificacion.service';
import { Planificacion } from 'src/models/planificar_clase';

@Component({
  selector: 'app-gestion-planificacion',
  templateUrl: './gestion-planificacion.component.html',
  styleUrls: ['./gestion-planificacion.component.scss'],
})
export class GestionPlanificacionComponent  implements OnInit {
  activado=false;
  planificarClaseForm:FormGroup
  planificacion:Planificacion
  mostrarInformacionPlanificacion: boolean = false;
  constructor(private route:ActivatedRoute,private planificacioService:PlanificacionService,
    private formBuilder: FormBuilder,private toastController:ToastController,private alertController: AlertController,
    private navCtrl: NavController
  ) {
    this.planificarClaseForm=this.formBuilder.group({
      tema_planificacion:['',Validators.required],
      fecha_inicio_planificacion:[new Date,Validators.required],
      fecha_termino_planificacion:[new Date,Validators.required],
      nombre_profesor:['',Validators.required],
      rut_profesor:['',Validators.required],
      cursos: [[],Validators.required],
      
      objetivo_aprendisaje:['',Validators.required],
      ambito_aprendisaje:['',Validators.required],
      nucleo_aprendisaje:['',Validators.required],
      indicador_exito_aprendisaje:['',Validators.required,],
      cantidad_actividades:[0,Validators.required],
      actividades: this.formBuilder.array([]) 



    })

   }

  ngOnInit() {
     const _id=this.route.snapshot.paramMap.get('_id');
     console.log('ID del curso recibido:', _id);
     this.planificacioService.obtener_Planificacion_ID(_id).subscribe(
      (planificacion)=>{
        this.planificacion=planificacion;
        console.log(planificacion);
        this.activado=false
        this.mostrarInformacionPlanificacion=false;
        this.patchValue();
         

      }
     )
     this.planificarClaseForm.get('cantidad_actividades').valueChanges.subscribe(val => {
      if (Number.isInteger(val) && val >= 0) {
        while (this.actividades.controls.length !== val) {
          if (this.actividades.controls.length < val) {
            this.agregarActividad();
          } else {
            this.actividades.removeAt(this.actividades.controls.length - 1);
          }
        }
      }
    });
   

    

  }
  get actividades(): FormArray {
    return this.planificarClaseForm.get('actividades') as FormArray;
  }
  
  agregarActividad() {
    this.actividades.push(this.formBuilder.group({
      nombre_actividad: ['', Validators.required],
      descripcion_actividad: ['', Validators.required],
      ambito_actividad: ['', Validators.required],
      nucleo_actividad: ['', Validators.required],
      objetivo_especifico_actividad: ['', Validators.required],
      rubrica_evaluacion_actividad: ['', Validators.required],
      evaluacion_actividad:[''],
      detallesVisibles: [false]
      // Agrega más campos aquí para el resto de la información de la actividad
    }));
  }

  patchValue(){
    const fecha_inicio_planificacion = this.formatDate(this.planificacion.fecha_inicio_planificacion);
    const fecha_termino_planificacion = this.formatDate(this.planificacion.fecha_termino_planificacion);
    
    this.planificarClaseForm.patchValue({
      tema_planificacion:this.planificacion.tema_planificacion,
      fecha_inicio_planificacion:fecha_inicio_planificacion,
      fecha_termino_planificacion:fecha_termino_planificacion,
      nombre_profesor:this.planificacion.nombre_profesor,
      rut_profesor:this.planificacion.rut_profesor,
      cursos:this.planificacion.cursos,
      objetivo_aprendisaje:this.planificacion.objetivo_aprendisaje,
      ambito_aprendisaje:this.planificacion.ambito_aprendisaje,
      nucleo_aprendisaje:this.planificacion.nucleo_aprendisaje,
      indicador_exito_aprendisaje:this.planificacion.indicador_exito_aprendisaje,
      cantidad_actividades:this.planificacion.cantidad_actividades


    });
    
    this.planificarClaseForm.get('actividades').disable();
    const actividadesControl = <FormArray>this.planificarClaseForm.controls['actividades'];
  this.planificacion.actividades.forEach((actividad, index) => {
    actividadesControl.at(index).patchValue(actividad);
  });
  }

  modificar_Planificacion(){
    const _id= this.planificacion._id;
    console.log(_id)
    const planificacion=this.planificarClaseForm.value;
    this.planificacioService.modificar_planificacion(_id,planificacion).subscribe(()=>{
      this.presentToast("Datos actualizados")

    })

  }
  async eliminar_Planificacion(){
    const _id=this.planificacion._id;
    const confirm= await this.presentConfirm();
    if(confirm){
      this.planificacioService.eliminar_Planificacion(_id).subscribe(
        ()=>{
          this.presentToast("Anotación eliminada con exito").then(() => {
            setTimeout(() => {
              this.navCtrl.navigateBack(['/lista-planificacion']);
            }, 2000); // Espera 2 segundos antes de navegar hacia atrás
          });
        }
        
      )
    
    }


  }
  habilitarEdicion(){
    this.activado=true;
    this.planificarClaseForm.enable();
    this.mostrarInformacionPlanificacion=true;

  }
  desabilitar_Edicion(){
    this.activado=false;
    this.planificarClaseForm.disable();
    this.mostrarInformacionPlanificacion=false;
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
  compareWithFn(o1, o2) {
    return o1 && o2 ? o1.nombreCurso === o2.nombreCurso : o1 === o2;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
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
  

}
