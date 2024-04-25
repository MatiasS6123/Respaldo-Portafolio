import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { GestionCService } from 'src/app/Service/gestion-c.service';
import { GestionCurso } from 'src/models/gestionC';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  asistencia: { [nombre: string]: boolean } = {};
  gestionCurso: GestionCurso;

  constructor(
    private toastController: ToastController,
    private gestionC: GestionCService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Obtener el _id del curso de la URL
    const nombreCurso = this.route.snapshot.paramMap.get('nombreCurso');
    console.log('ID del curso recibido:', nombreCurso);
    this.gestionC.getCursoByNombre(nombreCurso).subscribe(
      (curso) => {
        this.gestionCurso = curso;
        console.log('Información del curso:', this.gestionCurso);
        // Aquí puedes realizar cualquier otra acción necesaria con la información del curso
      },
      (error) => {
        console.error('Error al obtener información del curso:', error);
        // Maneja el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
      }
    );
  }

  inicializarAsistencia(): void {
    // Inicializar la asistencia para cada estudiante como false
    this.gestionCurso.alumno.forEach(estudiante => {
      this.asistencia[estudiante] = false;
    });
  }

  guardarAsistencia(): void {
    // Crear un array de asistencia
    const asistenciaData = {
      fecha: new Date(),
      asistencia: Object.entries(this.asistencia).map(([nombre, presente]) => ({ nombre, presente }))
    };

    // Enviar datos al servicio (código comentado porque aún no está implementado)
    /*this.asistenciaService.guardarAsistencia(asistenciaData).subscribe(
      () => {
        console.log('Asistencia guardada exitosamente');
        this.presentToast('Asistencia guardada exitosamente');
      },
      error => {
        if (error.status === 201) {
          this.presentToast('Asistencia Guardada correctamente');
        }
      }
    );*/
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
