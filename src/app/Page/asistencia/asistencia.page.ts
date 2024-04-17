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
  asistencia: { [nombre: string]: boolean } = {};

  constructor(
    private asistenciaService: AsistenciaService,
    private estudianteService: EstudianteService,
    private toastController: ToastController
  ) { }

  ngOnInit(): void {
    this.estudianteService.getEstudiantes().subscribe(estudiantes => {
      this.estudiantes = estudiantes;
      this.inicializarAsistencia();
    });
  }

  inicializarAsistencia(): void {
    this.estudiantes.forEach(estudiante => {
      this.asistencia[estudiante.nombre] = false;
    });
  }
  guardarAsistencia(): void {
    // Crear un array de asistencia
    const asistenciaData = {
      fecha: new Date(),
      asistencia: Object.entries(this.asistencia).map(([nombre, presente]) => ({ nombre, presente }))
    };

    // Enviar datos al servicio
    this.asistenciaService.guardarAsistencia(asistenciaData).subscribe(
      () => {
        console.log('Asistencia guardada exitosamente');
        this.presentToast('Asistencia guardada exitosamente');
      },
      error => {
        if(error.status === 201){
          this.presentToast('Asistencia Guardada correctamente');

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
