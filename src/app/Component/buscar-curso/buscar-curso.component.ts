import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { GestionCService } from 'src/app/Service/gestion-c.service';
import { UserService } from 'src/app/Service/user.service';
import { Estudiante } from 'src/models/Estudiante';
import { GestionCurso } from 'src/models/gestionC';
import { User } from 'src/models/User'; // Importar el modelo de usuario

@Component({
  selector: 'app-buscar-curso',
  templateUrl: './buscar-curso.component.html',
  styleUrls: ['./buscar-curso.component.scss'],
})
export class BuscarCursoComponent implements OnInit {
  cursoForm!: FormGroup;
  estado:boolean;
  mostrarInformacionCurso: boolean = false;
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  nombresEstudiantes: Estudiante[] = [];  // Agregar una propiedad para almacenar los profesores
  profesores: User[] = [];
  gestionCurso:GestionCurso

  constructor(private formBuilder: FormBuilder, private CursoGService: GestionCService, private toastController: ToastController,
    private estudianteService: EstudianteService,private userService:UserService, private route: ActivatedRoute,private alertControler:AlertController, private navCtr:NavController) { 
      this.initCursoForm();
      this.obtenerNombresEstudiantes();
      
    }

  ngOnInit() {
   const _id = this.route.snapshot.paramMap.get('_id');
   this.CursoGService.getCursoByID(_id).subscribe(
    (curso)=>{
      this.gestionCurso=curso;
      console.log(curso)
      this.estado=false;
      this.mostrarInformacionCurso=false;
      this.PatchValue();
    }
   )
   this.cursoForm.get("nuevos_alumnos").valueChanges.subscribe(
    (nuevosAlumnos)=>{
      const alumnosSeleccionados = this.cursoForm.get('alumnos').value;
      alumnosSeleccionados.push(...nuevosAlumnos);
    
    // Actualiza el primer select
    this.cursoForm.patchValue({
      alumnos: alumnosSeleccionados
    });
    }
  )

   
    
  }

  private initCursoForm(): void {
    this.cursoForm = this.formBuilder.group({
      nombreCurso: [{ value: '', disabled: true }, [Validators.required]],
      cantidadAlumno: [{ value: '', disabled: true }, Validators.required],
      nombreProfesor: [[], Validators.required],
      nivel_curso:[{ value: '', disabled: true }, [Validators.required]],
      dias: [[], [Validators.required]],
      alumnos: [[],Validators.required],
      nuevos_alumnos:[[]], // Modificar el nombre del campo para que coincida con el nombre del formulario
      mostrarEstudiantes: [false]


    });
  }

  

  PatchValue() {
    this.cursoForm.patchValue({
      nombreCurso:this.gestionCurso.nombreCurso,
      cantidadAlumno:this.gestionCurso.cantidadAlumno,
      nombreProfesor:this.gestionCurso.profesor,
      nivel_curso:this.gestionCurso.nivel_curso,
      dias:this.gestionCurso.dias,
      alumnos:this.gestionCurso.alumno,
    })
  
  }

  getEstudiantesNoSeleccionados() {
    const alumnosSeleccionados = this.cursoForm.get('alumnos').value;
    const rutsAlumnosSeleccionados = alumnosSeleccionados.map(alumno => alumno.rut);
    return this.nombresEstudiantes.filter(estudiante => !rutsAlumnosSeleccionados.includes(estudiante.rut))
      .map(estudiante => ({ nombre: estudiante.nombre, rut: estudiante.rut })); // Solo devuelve el nombre y el rut
  }
   
  // Método para obtener la lista de profesores
  obtenerProfesores() {
    this.userService.getProfesores().subscribe(
      (profesores) => {
        this.profesores = profesores;
      },
      (error) => {
        console.error('Error al obtener profesores:', error);
      }
    );
  }

  // Método para habilitar la edición del formulario
  habilitarEdicion() {
    this.cursoForm.enable();
    this.estado = true; // Habilitar todos los campos del formulario
    this.mostrarInformacionCurso=true;
  }
  desabilitarEdicion(){
    this.cursoForm.disable();
    this.estado=false;
    this.mostrarInformacionCurso=false;
  }

  // Método para actualizar el curso
  actualizarCurso() {
    const _id = this.gestionCurso._id;
    const nuevaData:GestionCurso={
      nombreCurso:this.cursoForm.get('nombreCurso').value,
      cantidadAlumno:this.cursoForm.get('cantidadAlumno').value,
      profesor:this.cursoForm.get('nombreProfesor').value,
      nivel_curso:this.cursoForm.get('nivel_curso').value,
      dias:this.cursoForm.get('dias').value,
      alumno:this.cursoForm.get('alumnos').value
    }
    console.log(nuevaData)
    this.CursoGService.updateCurso(_id,nuevaData).subscribe(
      ()=>{
        this.presentToast("Datos actualizados");
        this.cursoForm.disable();
        this.estado=false
      }
    )
    
  }
  

  // Método para eliminar el curso
  async eliminarCurso() {
    const _id=this.gestionCurso._id;
    const result= await this.presentConfirm();
    if(result){
      this.CursoGService.deleteCurso(_id).subscribe(
        ()=>{
          this.presentToast("Asignacion  eliminada con exito").then(() => {
            setTimeout(() => {
              this.navCtr.navigateBack(['/ver-lista-cursos-directora']);
            }, 2000); // Espera 2 segundos antes de navegar hacia atrás
          });
          
        }
      )
    }
    
  }

  // Método para mostrar un mensaje de Toast
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  // Método para obtener los nombres de los estudiantes
  obtenerNombresEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe(
      (estudiantes: Estudiante[]) => {
        this.nombresEstudiantes = estudiantes;
        console.log(estudiantes)
      },
      (error) => {
        console.error('Error al obtener estudiantes:', error);
      }
    );
  }
  
 
  async presentConfirm(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertControler.create({
        header: 'Confirmación',
        message: '¿Estás seguro de que quieres eliminar la asignación de este curso?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancelado');
              resolve(false);
            }
          }, {
            text: 'Eliminar',
            handler: () => {
              console.log('Eliminado');
              // Aquí puedes poner el código para eliminar el elemento
              resolve(true);
            }
          }
        ]
      });
  
      await alert.present();
    });
  }
 
  
}
