import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestionCService } from 'src/app/Service/gestion-c.service';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/models/User';
import { GestionCurso } from 'src/models/gestionC';

@Component({
  selector: 'app-lista-curso',
  templateUrl: './lista-curso.component.html',
  styleUrls: ['./lista-curso.component.scss'],
})
export class ListaCursoComponent implements OnInit {

  cursos: GestionCurso[] = [];
  profesores: User[] = [];

  constructor(
    private userService: UserService,
    private gestionCService: GestionCService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarCurso();
  }

  mostrarCurso() {
    this.userService.getUserInfo().subscribe(
      (usuario) => {
        this.gestionCService.getCursosAsignados(usuario.rut).subscribe(
          (curso) => {
            this.cursos = curso;
            console.log(curso)
          },
          (error) => {
            if (error instanceof HttpErrorResponse && error.status === 404) {
              console.error('No se encontraron cursos asignados:', error);
            } else {
              console.error('Error al obtener cursos asignados:', error);
            }
          }
        );
      }
    );
  }

  redirigirAsistencia(nombreCurso: string) {
    // Navegar a la página de asistencia con el ID del curso como parámetro
    this.router.navigate(['/asistencia', nombreCurso]);
  }

  redirigirNota(nombreCurso: string) {
    // Navegar a la página de asistencia con el ID del curso como parámetro
    this.router.navigate(['/nota', nombreCurso]);
  }


  
  redirigirAnotacion(nombreCurso: string) {
    // Navegar a la página de asistencia con el ID del curso como parámetro
    this.router.navigate(['/anotacion', nombreCurso]);
  }
  redirigirCitacion(nombreCurso: string) {
    // Navegar a la página de asistencia con el ID del curso como parámetro
    this.router.navigate(['/citacion', nombreCurso]);
  }


}

