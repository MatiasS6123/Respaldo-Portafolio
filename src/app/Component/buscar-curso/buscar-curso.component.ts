import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { GestionCService } from 'src/app/Service/gestion-c.service';
import { Estudiante } from 'src/models/Estudiante';
import { GestionCurso } from 'src/models/gestionC';

@Component({
  selector: 'app-buscar-curso',
  templateUrl: './buscar-curso.component.html',
  styleUrls: ['./buscar-curso.component.scss'],
})
export class BuscarCursoComponent implements OnInit {
  cursoForm!: FormGroup;
  buscarForm!: FormGroup;
  cursoEncontrado: GestionCurso | null = null;
  mostrarInformacionCurso: boolean = false;
  edicionHabilitada: boolean = false;
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  nombresEstudiantes: string[] = [];

  constructor(private formBuilder: FormBuilder, private CursoGService: GestionCService, private toastController: ToastController,
    private estudianteService: EstudianteService) { }

  ngOnInit() {
    this.initCursoForm();
    this.initBuscarForm();
    this.obtenerNombresEstudiantes();
  }

  private initCursoForm(): void {
    this.cursoForm = this.formBuilder.group({
      nombreCurso: [{ value: '', disabled: true }, [Validators.required]],
      cantidadAlumno: [{ value: '', disabled: true }, Validators.required],
      nombreProfesor: [{ value: '', disabled: true }, Validators.required],
      dias: [[], [Validators.required]],
      alumnos: [[]] // Modificar el nombre del campo para que coincida con el nombre del formulario
    });
  }

  private initBuscarForm(): void {
    this.buscarForm = this.formBuilder.group({
      nombreCurso: ['', [Validators.required]]
    });
  }

  buscarCurso() {
    this.CursoGService.getCursoByNombre(this.buscarForm.get('nombreCurso')?.value).subscribe(
      (curso: any) => {
        console.log('Curso encontrado:', curso);
  
        if (curso) {
          this.cursoEncontrado = curso;
          this.mostrarInformacionCurso = true;
  
          // Asignar los datos al formulario
          this.cursoForm.patchValue({
            nombreCurso: curso.nombreCurso,
            cantidadAlumno: curso.cantidadAlumno,
            nombreProfesor: curso.nombreProfesor,
            dias: curso.dias,
            alumnos: curso.alumno // Asignar los estudiantes seleccionados al formulario
          });
  
          // Habilitar los campos del formulario para edición
          this.cursoForm.disable();
        } else {
          console.error('Curso no encontrado');
          this.cursoEncontrado = null;
          this.mostrarInformacionCurso = false;
        }
      },
      (error) => {
        this.presentToast("Error al buscar el curso");
        console.error('Error al buscar el curso:', error);
      }
    );
  }
  
  
  actualizarCurso() {
    if (this.cursoForm.invalid) {
      this.presentToast('El formulario es inválido. Corrige los campos resaltados.');
      return;
    }

    const cursoActualizado: GestionCurso = this.cursoForm.value;
    this.CursoGService.updateCurso(cursoActualizado.nombreCurso, cursoActualizado).subscribe(
      (curso: GestionCurso) => {
        this.presentToast('Curso actualizado correctamente:');
        this.cursoEncontrado = curso;
        // Aquí puedes realizar alguna acción adicional después de actualizar el curso, si es necesario
        this.cursoForm.disable();
      },
      (error) => {
        console.error('Error al actualizar el curso:', error);
      }
    );
  }

  eliminarCurso() {
    const nombreCurso = this.cursoForm.get('nombreCurso')?.value;
    if (!nombreCurso) {
      this.presentToast('No se proporcionó un nombre válido para eliminar el curso');
      return;
    }

    this.CursoGService.deleteCurso(nombreCurso).subscribe(
      () => {
        this.presentToast('Curso eliminado correctamente');
        this.cursoEncontrado = null;
        this.mostrarInformacionCurso = false;
        this.cursoForm.reset();
      },
      (error) => {
        this.presentToast("Error al eliminar el curso");
        console.error('Error al eliminar el curso:', error);
      }
    );
  }

  habilitarEdicion() {
    this.cursoForm.enable();
    this.edicionHabilitada = true; // Habilitar todos los campos del formulario
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  obtenerNombresEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe(
      (estudiantes: Estudiante[]) => {
        this.nombresEstudiantes = estudiantes.map(estudiante => `${estudiante.nombre} ${estudiante.apellido}`);
      },
      (error) => {
        console.error('Error al obtener estudiantes:', error);
      }
    );
  }
}
