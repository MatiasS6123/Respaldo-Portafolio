import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from 'src/models/Estudiante';
import { EstudianteService } from 'src/app/Service/estudiante.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.page.html',
  styleUrls: ['./estudiantes.page.scss'],
})
export class EstudiantesPage implements OnInit {
  estudianteForm!: FormGroup;
  estudiante: Estudiante = {
    rut: '',
    nombre: '',
    apellido: '',
    edad: 0,
    sexo: '',
    nacionalidad: '',
    fecha_nac: new Date()
  };
  rutBuscar!: string;
  estudianteEncontrado: Estudiante | null = null;
  mostrarFormulario: boolean = true;
  mostrarInformacionEstudiante: boolean = false;

  constructor(private formBuilder: FormBuilder, private estudianteService: EstudianteService) {}

  ngOnInit(): void {
    this.estudianteForm = this.formBuilder.group({
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [0, Validators.required],
      sexo: ['', Validators.required],
      nacionalidad: ['', Validators.required], // Agregado el campo de nacionalidad al formulario
      fecha_nac: [new Date().toISOString(), Validators.required]
    });
  }

  guardarEstudiante() {
    if (this.estudianteForm.valid) {
      // Obtiene la fecha de nacimiento del formulario
      const fechaNacimientoISO = this.estudianteForm.get('fecha_nac')?.value;
      // Formatea la fecha de nacimiento al formato 'dd/mm/yyyy'
      const fechaNacimiento = fechaNacimientoISO.split('T')[0].split('-').reverse().join('/');
      
      // Asigna la fecha formateada de nuevo al formulario
      this.estudianteForm.patchValue({ fecha_nac: fechaNacimiento });
  
      console.log('Estudiante a guardar:', this.estudianteForm.value);
      this.estudiante = this.estudianteForm.value;
      this.estudianteService.createEstudiante(this.estudiante).subscribe(
        (res) => {
          console.log('Estudiante guardado correctamente:', res);
          this.estudianteForm.reset(); // Reinicia el formulario después de guardar
        },
        (error) => {
          console.error('Error al guardar estudiante:', error);
        }
      );
    } else {
      console.error('Formulario de estudiante inválido. Por favor, revise los campos.');
    }
  }

  buscarEstudiante() {
    this.estudianteService.getEstudianteById(this.rutBuscar).subscribe(
      (estudiante: any) => {
        console.log('Estudiante encontrado:', estudiante);
  
        if (estudiante) {
          // Verificar si la fecha de nacimiento es una cadena antes de formatearla
          if (typeof estudiante.fecha_nac === 'string' && estudiante.fecha_nac) {
            // Formatear la fecha de nacimiento al formato 'DD/MM/YYYY'
            const fechaPartes = estudiante.fecha_nac.split('T')[0].split('-');
            if (fechaPartes.length === 3) {
              const fechaFormateada = `${fechaPartes[2]}/${fechaPartes[1]}/${fechaPartes[0]}`;
              estudiante.fecha_nac = fechaFormateada;
            } else {
              console.error('La fecha de nacimiento no es válida:', estudiante.fecha_nac);
            }
          }
  
          // Asignar el estudiante encontrado y mostrar la información
          this.estudianteEncontrado = estudiante;
          this.mostrarFormulario = false;
          this.mostrarInformacionEstudiante = true;
        } else {
          // Mostrar mensaje de estudiante no encontrado y volver a mostrar el formulario
          this.mostrarFormulario = true;
          this.mostrarInformacionEstudiante = false;
          console.error('Estudiante no encontrado');
        }
      },
      (error) => {
        console.error('Error al buscar estudiante:', error);
      }
    );
  }
  
  
  
    
  
   

  eliminarEstudiante(id: string) {
    this.estudianteService.deleteEstudiante(id).subscribe(
      () => {
        console.log('Estudiante eliminado correctamente');
        this.estudianteEncontrado = null;
      },
      (error) => {
        console.error('Error al eliminar estudiante:', error);
      }
    );
  }

  editarEstudiante(estudiante: Estudiante) {
    // Lógica para editar un estudiante
  }
}
