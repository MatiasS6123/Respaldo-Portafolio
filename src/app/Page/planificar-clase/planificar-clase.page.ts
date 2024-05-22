import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { GestionCService } from 'src/app/Service/gestion-c.service';
import { PlanificacionService } from 'src/app/Service/planificacion.service';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/models/User';
import { GestionCurso } from 'src/models/gestionC';

@Component({
  selector: 'app-planificar-clase',
  templateUrl: './planificar-clase.page.html',
  styleUrls: ['./planificar-clase.page.scss'],
})
export class PlanificarClasePage implements OnInit {

  rut_profesor:string;
  nombre_profesor:string;
  cursos: GestionCurso[] = [];
  planificarClaseForm:FormGroup
  constructor(private userSerivice:UserService,private formBuilder: FormBuilder,private toastController:ToastController,private planificacionService:PlanificacionService,
    private gestionCService:GestionCService
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
    this.planificarClaseForm.get('cantidad_actividades').valueChanges.subscribe(val => {
      if (Number.isInteger(val) && val >= 0) {
        while (this.actividades.length !== val) {
          if (this.actividades.length < val) {
            this.agregarActividad();
          } else {
            this.actividades.removeAt(this.actividades.length - 1);
          }
        }
      }
    });

    this.obtenerProfile();
    this.obtenerCursos();
    
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

  obtenerProfile() {
    this.userSerivice.getUserInfo().subscribe(
      (usuario: User) => {
        console.log("Datos",usuario); // Imprime la información del usuario obtenida
        this.planificarClaseForm.patchValue({
          nombre_profesor: usuario.nombre,
          rut_profesor: usuario.rut
        });
      }
    );
  }

  obtenerCursos(){
    this.userSerivice.getUserInfo().subscribe(
      (usuario:User)=>{
        this.gestionCService.getCursosAsignados(usuario.rut).subscribe(
          (curso) => {
            this.cursos = curso;
            console.log(curso)
                      },
          (error) => {
            if (error instanceof HttpErrorResponse && error.status === 404) {
              console.error('No se encontraron cursos asignados:', error);
            } else {
              console.error('Error al obtener cursos asignados:', error);
            }
          }
        )
      }
    )
  }


  
  onSubmit() {
    if (this.planificarClaseForm.valid) {
      const formValues = { ...this.planificarClaseForm.value };
      // Transforma el array de strings 'cursos' en un array de objetos
      formValues.cursos = formValues.cursos.map(nombreCurso => ({ nombreCurso }));
      console.log(formValues)
      this.planificacionService.guardar_Planificacion(formValues).subscribe(
        ()=>{
          this.presentToast("Planificacion guardada Correctamente");
          const nombre_profesor = this.planificarClaseForm.get('nombre_profesor').value;
          const rut_profesor = this.planificarClaseForm.get('rut_profesor').value;
          this.planificarClaseForm.reset();

          this.planificarClaseForm.patchValue({
            nombre_profesor: nombre_profesor,
            rut_profesor: rut_profesor
          });
         

        }
        
        
      );
      
      
      
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

}
