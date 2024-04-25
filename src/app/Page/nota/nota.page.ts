import { Component, OnInit } from '@angular/core';
import { NotaService } from 'src/app/Service/nota.service';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { Estudiante } from 'src/models/Estudiante';
import { Nota } from '../../../models/nota';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { GestionCurso } from 'src/models/gestionC';
import { ActivatedRoute } from '@angular/router';
import { GestionCService } from 'src/app/Service/gestion-c.service';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.page.html',
  styleUrls: ['./nota.page.scss'],
})
export class NotaPage implements OnInit {

  gestionCurso: GestionCurso;

  nota: Nota = {
    asignatura: '',
    curso: '',
    notas: [],
    fecha: new Date()
  };
  notasEstudiantes: { [nombre: string]: number } [] = []; //
  constructor(
    private notaService: NotaService,
    private gestionC: GestionCService,
    private toastController:ToastController,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
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

  guardarNotas(): void {
    // Validar las notas ingresadas
    console.log('Notas ingresadas:', this.notasEstudiantes);
  
    const notasArray = Object.keys(this.notasEstudiantes).map(nombre => ({ nombre, nota: this.notasEstudiantes[nombre] }));
  
    // Construir el objeto Nota
    const nuevaNota: Nota = {
      asignatura: this.nota.asignatura,
      curso: this.gestionCurso.nombreCurso,
      notas: notasArray,
      fecha: this.nota.fecha
    };
  
    console.log('Nueva nota a guardar:', nuevaNota);
  
    // Llamar al servicio para guardar la nueva nota
    this.notaService.guardarNota(nuevaNota).subscribe(() => {
      console.log('Nota guardada exitosamente.');
      // Limpiar el formulario después de guardar la nota
      this.nota.asignatura = '';
      this.nota.curso = '';
      // Limpiar las notas de los estudiantes
      this.notasEstudiantes = []; // Limpiar el objeto de notas
    }, error => {
      // Si hay un error diferente, manejarlo apropiadamente
      console.error('Error al guardar la nota:', error);
      // Puedes agregar más lógica aquí según sea necesario
    });
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
