import { Component, OnInit } from '@angular/core';
import { NotaService } from 'src/app/Service/nota.service';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { Estudiante } from 'src/models/Estudiante';
import { Nota } from '../../../models/nota';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.page.html',
  styleUrls: ['./nota.page.scss'],
})
export class NotaPage implements OnInit {

  estudiantes: Estudiante[];
  nota: Nota = {
    asignatura: '',
    curso: '',
    notas: [],
    fecha: new Date()
  };
  notasEstudiantes: { [nombre: string]: number } [] = []; //
  constructor(
    private notaService: NotaService,
    private estudianteService: EstudianteService,
    private toastController:ToastController
  ) { }

  ngOnInit(): void {
    this.estudianteService.getEstudiantes().subscribe(
      estudiantes => {
        this.estudiantes = estudiantes;
        console.log('Estudiantes obtenidos:', this.estudiantes);
      },
      error => {
        console.error('Error al obtener estudiantes:', error);
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
      curso: this.nota.curso,
      notas: notasArray,
      fecha: this.nota.fecha
    };
  
    console.log('Nueva nota a guardar:', nuevaNota);
  
    console.log('Nota a enviar al backend:', nuevaNota); // Imprime nuevaNota
  
    // Llamar al servicio para guardar la nueva nota
    this.notaService.guardarNota(nuevaNota).subscribe(() => {
      console.log('Nota guardada exitosamente.');
      // Limpiar el formulario después de guardar la nota
      this.nota.asignatura = '';
      this.nota.curso = '';
      // Limpiar las notas de los estudiantes
      this.notasEstudiantes = []; // Limpiar el objeto de notas
    }, error=>{
      
       // Si la solicitud no es exitosa (estado 201), considerarla como exitosa
       if (error.status === 201) {
        this.presentToast("Notas guardadas correctamente");
        this.nota.asignatura = '';
        this.nota.curso = '';
        // Limpiar las notas de los estudiantes
        this.notasEstudiantes = [];
        } else {
        // Si hay un error diferente, manejarlo apropiadamente
        // Puedes agregar más lógica aquí según sea necesario
      }

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
