import { Component, OnInit } from '@angular/core';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { Estudiante } from 'src/models/Estudiante';

@Component({
  selector: 'app-lista-estudiante',
  templateUrl: './lista-estudiante.component.html',
  styleUrls: ['./lista-estudiante.component.scss'],
})
export class ListaEstudianteComponent  implements OnInit {

  rutBuscar!: string;
  estudianteEncontrado: Estudiante | null = null;
  mostrarFormulario: boolean = true;
  mostrarInformacionEstudiante: boolean = false;

  constructor(private estudianteService: EstudianteService) { }

  ngOnInit() {}

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
  
  

  eliminarEstudiante(rut: string) {
    this.estudianteService.deleteEstudiante(rut).subscribe(
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
