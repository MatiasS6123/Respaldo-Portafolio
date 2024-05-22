import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { debounceTime } from 'rxjs';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { GestionCService } from 'src/app/Service/gestion-c.service';
import { UserService } from 'src/app/Service/user.service';
import { Estudiante } from 'src/models/Estudiante';
import { User } from 'src/models/User';
import { GestionCurso } from 'src/models/gestionC';

@Component({
  selector: 'app-gestion-curso',
  templateUrl: './gestion-curso.page.html',
  styleUrls: ['./gestion-curso.page.scss'],
})
export class GestionCursoPage implements OnInit {

  gestionCursoForm!: FormGroup;
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  alumnos: { nombre: string, rut: string }[] = [];

  selectedAlumnos: any[] = [];

  filteredAlumnos: any[]; // Alumnos filtrados
  searchTerm: string = '';
  profesores: { nombre: string, rut: string }[] = [];

  constructor(private formBuilder: FormBuilder, private GestionCservice: GestionCService, private toastControler: ToastController,
    private estudianteService: EstudianteService, private userService: UserService) {
    this.gestionCursoForm = this.formBuilder.group({
      nombreCurso: ['', Validators.required],
      profesor:[[], Validators.required],
      nivel_curso:['',Validators.required],
      cantidadAlumno:['',Validators.required],
      dias: [[], Validators.required],
      alumno: [[], Validators.required],
      searchControl:['']
    });
  }

  ngOnInit(): void {
    this.obtenerNombresEstudiantes();
    this.obtenerProfesor(); // Llama a la función para obtener los profesores
    
    this.gestionCursoForm.get('searchControl').valueChanges
    .pipe(debounceTime(700))
    .subscribe(searchTerm => {
      this.setFilteredItems();
    });
  }

  onSubmit() {
    // Aquí puedes manejar la lógica para enviar el formulario al backend
    console.log(this.gestionCursoForm.value);
  }

  guardarCurso(): void {
    if (this.gestionCursoForm.valid) {
      console.log('Formulario válido. Guardando curso...');
      const formData = this.gestionCursoForm.value; // Obtener todos los datos del formulario

      // Crear un objeto curso que contenga todos los datos del formulario
      const curso: GestionCurso = {
        nombreCurso: formData.nombreCurso,
        cantidadAlumno: formData.cantidadAlumno,
        profesor: formData.profesor,
        nivel_curso:formData.nivel_curso,
        dias: formData.dias,
        alumno: formData.alumno
      };
      console.log("datos a enviar",curso)

      this.GestionCservice.asignarCurso(curso).subscribe(
        () => {
          this.presentToast("Curso asignado correctamente");
          console.log('Curso guardado correctamente.');
          this.gestionCursoForm.reset();
        },
        (error) => {
          console.error('Error al guardar el curso:', error);
          this.presentToast("Error al guardar el curso");
        }
      );
    } else {
      console.error('El formulario no es válido');
      this.presentToast("El formulario no es válido");
    }
  }

  obtenerNombresEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe(
      (estudiantes: Estudiante[]) => {
        this.alumnos = estudiantes.map(estudiante => ({
          nombre: `${estudiante.nombre} ${estudiante.apellido}`,
          rut: estudiante.rut
        }));
        // Inicializa 'filteredAlumnos' con los mismos valores que 'alumnos'
        this.filteredAlumnos = [...this.alumnos];
      },
      (error) => {
        console.error('Error al obtener estudiantes:', error);
      }
    );
  }
  
  setFilteredItems() {
    let searchTerm = this.gestionCursoForm.get('searchControl').value;
    if (searchTerm) {
      this.filteredAlumnos = this.alumnos.filter((alumno) => {
        return alumno.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || this.selectedAlumnos.includes(alumno);
      });
      if (this.filteredAlumnos.length > 0) {
        this.presentToast("Estudiante encontrado por favor seleccione ");
      } else {
        this.presentToast("No se encontró ningún estudiante con ese nombre o rut");
      }
    } else {
      
      this.filteredAlumnos = [...this.alumnos];
    }
  }
   
  async presentToast(message: string) {
    const toast = await this.toastControler.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  obtenerProfesor() {
    this.userService.getProfesores().subscribe(
      (profesores) => {
        this.profesores = profesores.map(profesor => ({
          nombre: profesor.nombre,
          rut: profesor.rut
        }));
      }
    );
  }
  updateSelectedAlumnos(event: any) {
    this.selectedAlumnos = event.detail.value;
  }
}
