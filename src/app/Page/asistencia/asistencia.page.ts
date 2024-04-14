import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsistenciaService } from 'src/app/Service/asistencia.service';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { Estudiante } from 'src/models/Estudiante';
import { Asistencia } from '../../../models/asistencia'; // Importa el tipo Asistencia
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  estudiantes: Estudiante[] = [];
  asistenciaForm: FormGroup;

  constructor(
    private asistenciaService: AsistenciaService,
    private estudianteService: EstudianteService,
    private formBuilder: FormBuilder,
    private toastController:ToastController
  ) { }

  ngOnInit(): void {
    this.estudianteService.getEstudiantes().subscribe(estudiantes => {
      this.estudiantes = estudiantes;
      this.buildForm();
    });
  }

  buildForm(): void {
    // Creamos un objeto vacío para almacenar los FormControl de asistencia
    const formControls: any = {};
  
    // Para cada estudiante, creamos un FormControl con valor inicial 'false'
    this.estudiantes.forEach(estudiante => {
      formControls[estudiante.nombre] = [false];
    });
  
    // Construimos el FormGroup con los formControls
    this.asistenciaForm = this.formBuilder.group(formControls);
  }
  
  
  guardarAsistencia(): void {
    // Creamos un objeto de tipo Asistencia
    const asistenciaData: Asistencia = {
      fecha: new Date(), // Supongo que quieres la fecha actual
      asistencia: []
    };
    
    // Recorremos los estudiantes para obtener sus nombres y su estado de asistencia
    Object.keys(this.asistenciaForm.controls).forEach(nombre => {
      asistenciaData.asistencia.push({ nombre, presente: this.asistenciaForm.get(nombre)?.value });
    });
    
    // Enviamos los datos de asistencia al servicio
    this.asistenciaService.guardarAsistencia(asistenciaData).subscribe(
      () => {
        console.log('Asistencia guardada exitosamente');
      },
      error => {
        
        // Si la solicitud no es exitosa (estado 201), considerarla como exitosa
        if (error.status === 201) {
          this.presentToast('Asistencia guardada exitosamente');
          this.asistenciaForm.reset();
        } else {
          // Si hay un error diferente, manejarlo apropiadamente
          // Puedes agregar más lógica aquí según sea necesario
        }
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
