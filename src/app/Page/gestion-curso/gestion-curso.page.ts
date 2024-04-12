import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { GestionCService } from 'src/app/Service/gestion-c.service';
import { Estudiante } from 'src/models/Estudiante';
import { GestionCurso } from 'src/models/gestionC';

@Component({
  selector: 'app-gestion-curso',
  templateUrl: './gestion-curso.page.html',
  styleUrls: ['./gestion-curso.page.scss'],
})
export class GestionCursoPage implements OnInit {

  gestionCursoForm!: FormGroup;
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  alumnos: string[] = [];

  constructor(private formBuilder: FormBuilder,private GestionCservice:GestionCService, private toastControler:ToastController,
    private estudianteService:EstudianteService) { 
    this.gestionCursoForm = this.formBuilder.group({
      nombreCurso: ['', Validators.required],
      cantidadAlumno: ['', Validators.required],
      nombreProfesor: ['', Validators.required],
      dias: [[],Validators.required],
      alumno:[[],Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerNombresEstudiantes();
  }

  onSubmit() {
    // Aquí puedes manejar la lógica para enviar el formulario al backend
    console.log(this.gestionCursoForm.value);
  }

  guardarCurso(): void {
    if (this.gestionCursoForm.valid) {
      const curso: GestionCurso = this.gestionCursoForm.value;
      this.GestionCservice.asignarCurso(curso).subscribe(
        response => {
          // Manejar la respuesta del servidor si es necesario
          this.presentToast("Curso asignado correctamente");
          this.gestionCursoForm.reset();
        },
        error => {
          // Manejar el error si la solicitud falla
          console.error('Error al guardar el curso:', error);
        }
      );
    } else {
      // El formulario no es válido, puedes mostrar un mensaje de error o hacer algo más
      console.error('El formulario no es válido');
    }
  }

  obtenerNombresEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe(
      (estudiantes: Estudiante[]) => {
        this.alumnos = estudiantes.map(estudiante => `${estudiante.nombre} ${estudiante.apellido}`);
      },
      (error) => {
        console.error('Error al obtener estudiantes:', error);
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastControler.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
