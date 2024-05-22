import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { GestionCService } from 'src/app/Service/gestion-c.service';
import { GestionCurso } from 'src/models/gestionC';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenciaService } from 'src/app/Service/asistencia.service';
import { Asistencia } from 'src/models/asistencia';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  nombre_asignatura='';
  asistencia: { nombre: string; rut: string; presente: boolean }[] = []; 
  gestionCurso: GestionCurso;
  user:User
  nombreProfesor: string ;
  rutProfesor: string ;

  constructor(
    private toastController: ToastController,
    private gestionC: GestionCService,
    private router: Router,
    private route: ActivatedRoute,
    private asistenciaService: AsistenciaService,
    private authService:UserService
  ) { }

  ngOnInit() {
    const nombreCurso = this.route.snapshot.paramMap.get('nombreCurso');
    console.log('ID del curso recibido:', nombreCurso);
    this.gestionC.getCursoByNombre(nombreCurso).subscribe(
      (curso) => {
        this.gestionCurso = curso;
        console.log('Información del curso:', this.gestionCurso);
        this.inicializarAsistencia(); // Llamar a la función para inicializar la asistencia
      },
      (error) => {
        console.error('Error al obtener información del curso:', error);
      }
    );

    this.obtenerProfile();
  }

  inicializarAsistencia(): void {
    // Inicializar la asistencia para cada estudiante como ausente
    this.asistencia = this.gestionCurso.alumno.map(estudiante => ({
      nombre: estudiante.nombre,
      rut: estudiante.rut,
      presente: false
    }));
    console.log('Asistencia inicializada:', this.asistencia);
  }
  guardarAsistencia(): void {
    // Crear un array de asistencia
    const estudiantesPresentes = this.gestionCurso.alumno.filter(estudiante => this.asistencia[estudiante.rut]);

    console.log('Estudiantes presentes:', estudiantesPresentes);



    const asistenciaData: Asistencia = {
      
      nombreCurso: this.gestionCurso.nombreCurso,
      nombreAsignatura: this.nombre_asignatura,
      nombreProfesor: this.nombreProfesor,
      rutProfesor: this.rutProfesor,
      fecha: new Date(),
      asistencia: this.asistencia
        .filter(estudiante => estudiante.nombre && typeof estudiante.presente === 'boolean')
        .map(estudiante => ({ ...estudiante, rut: estudiante.rut }))

    };

    console.log("Datos a enviar",asistenciaData)
    // Enviar datos al servicio (código comentado porque aún no está implementado)
    this.asistenciaService.guardarAsistencia(asistenciaData).subscribe(
      () =>{
        this.presentToast("Asistencia Guardada correctamente");
        this.inicializarAsistencia();
        this.nombre_asignatura='';
      },error => {
        if(error.status === 201){
          console.log("Asistencia guardada")
        }
        // Si hay u
      }
    )
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  redirigirBitacora(nombreCurso: string) {
    // Navegar a la página de asistencia con el ID del curso como parámetro
    this.router.navigate(['/bitacora', nombreCurso]);
    }
    actualizarAsistencia(rutEstudiante: string) {
      // Encontrar al estudiante en el array de asistencia
      const estudiante = this.asistencia.find(item => item.rut === rutEstudiante);
      
      // Verificar si se encontró al estudiante en el array
      if (estudiante) {
        // Invertir el estado de presente del estudiante
        estudiante.presente = !estudiante.presente;
        console.log('Asistencia actualizada para', rutEstudiante, ':', estudiante);
      } else {
        console.error('Estudiante no encontrado en el array de asistencia');
      }
    }

    obtenerProfile() {
      this.authService.getUserInfo().subscribe(
        (usuario: User) => {
          // Asigna el nombre y rut del usuario a las variables correspondientes
          this.nombreProfesor = usuario.nombre;
          this.rutProfesor = usuario.rut;
          console.log(usuario); // Imprime la información del usuario obtenida
        }
      );
    }

    /**
     * asistencia: this.asistencia
        .filter(estudiante => estudiante.nombre && typeof estudiante.presente === 'boolean')
        .map(estudiante => ({ ...estudiante, rut: estudiante.rut }))
     */
    
}

