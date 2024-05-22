import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { Estudiante } from 'src/models/Estudiante';

@Component({
  selector: 'app-buscar-estudiante',
  templateUrl: './buscar-estudiante.component.html',
  styleUrls: ['./buscar-estudiante.component.scss'],
})
export class BuscarEstudianteComponent  implements OnInit {

  estudiante:Estudiante;
  estudianteForm!: FormGroup;
  edicionHabilitada: boolean = false;
  mostrarInformacionEstudiante: boolean = false;
  imageUrl: string;
  selectedFile: File;
  files: { [key: string]: File } = {};
  constructor(private formBuilder: FormBuilder, private estudianteService: EstudianteService, private toastController:ToastController,
    private alertController: AlertController,
    private route:ActivatedRoute,private navCtrl: NavController
  ) {
    this.initEstudianteForm();
  }

  ngOnInit() {
    const _id = this.route.snapshot.paramMap.get('_id');
    this.estudianteForm.disable();
    this.estudianteService.getEstudianteById(_id).subscribe(
      (estudiante) => {
        this.estudiante = estudiante;
        console.log(estudiante);

        // Asegúrate de que estudiante no sea null o undefined
        if (this.estudiante) {
          // Usa una nueva propiedad para la URL completa del certificado
          if (this.estudiante.certificado_enfermedad) {
            this.imageUrl = `${window.location.protocol}//${window.location.host}/${this.estudiante.certificado_enfermedad}`;
          } else {
            this.imageUrl = ''; // o cualquier valor por defecto
          }

          this.patchValue();
          this.mostrarInformacionEstudiante=false;
          this.edicionHabilitada=false;
        } else {
          console.error('Estudiante no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener estudiante:', error);
      }
    );
  }

  private initEstudianteForm(): void {
    this.estudianteForm = this.formBuilder.group({
      rut: [{value: '', disabled: true}, [Validators.required]], // Ejemplo de validación para un RUT chileno
      numero_matricula_estudiante:[{value:'',disable:true},[Validators.required]],
      nombre: [{value: '', disabled: true}, Validators.required],
      apellido: [{value: '', disabled: true}, Validators.required],
      edad: [{value: '', disabled: true}, [Validators.required, Validators.min(0), Validators.max(120)]], // Suponiendo una edad válida entre 0 y 120 años
      sexo: [{value: '', disabled: true}, Validators.required],
      nacionalidad: [{value: '', disabled: true}, Validators.required],
      fecha_nac: [{value: '', disabled: true}, Validators.required], // Podrías agregar un validador de fecha personalizado si es necesario
      tiene_enfermedad: [{value:false, disable:true}],
      tipo_enfermedad: [{value: '', disabled: true}],
      descripcion_enfermedad: [{value: '', disabled: true}],
      certificado_enfermedad: [{value: '', disabled: true}]
    });

  }

  
  patchValue() {
    const date=this.formatDate(this.estudiante.fecha_nac);
    this.estudianteForm.patchValue({
      rut:this.estudiante.rut,
      numero_matricula_estudiante:this.estudiante.numero_matricula_estudiante,
      nombre:this.estudiante.nombre,
      apellido:this.estudiante.apellido,
      edad:this.estudiante.edad,
      sexo:this.estudiante.sexo,
      nacionalidad:this.estudiante.nacionalidad,
      fecha_nac:date,
      tiene_enfermedad:this.estudiante.tiene_enfermedad,
      tipo_enfermedad:this.estudiante.tiene_enfermedad,
      descripcion_enfermedad:this.estudiante.descripcion_enfermedad
    })
}


  habilitarEdicion() {
    this.estudianteForm.enable(); 
    this.edicionHabilitada=true;// Habilitar todos los campos del formulario
    this.mostrarInformacionEstudiante=true;
  }
  cancelarEdicion(){
    this.estudianteForm.disable();
    this.edicionHabilitada=false;
    this.mostrarInformacionEstudiante=false;
  }

  async eliminarEstudiante() {
    const _id =this.estudiante._id;

    const result= await this.presentConfirm();
    if(result)
      {
        this.estudianteService.delete_Estudiante(_id).subscribe(
          () => {
            this.presentToast("Anotación eliminada con exito").then(() => {
              setTimeout(() => {
                this.navCtrl.navigateBack(['/lista-estudiante']);
              }, 2000); // Espera 2 segundos antes de navegar hacia atrás
            });
          },
          (error) => {
            this.presentToast("Error al eliminar estudiante")
            console.error('Error al eliminar estudiante:', error);
          }
        );
      }

    
    
  }

  actualizarEstudiante() {
    if (this.estudianteForm.invalid) {
      this.presentToast('El formulario es inválido. Corrige los campos resaltados.');
      return;
    }

    const estudianteActualizado: Estudiante = this.estudianteForm.value;
    const _id = this.estudiante._id;

    if (this.selectedFile) {
      this.estudianteService.update_Estudiante(_id, estudianteActualizado, this.selectedFile).subscribe(
        (estudiante: Estudiante) => {
          this.presentToast("Datos actualizados");
        },
        (error) => {
          console.error('Error al actualizar estudiante:', error);
        }
      );
    } else {
      this.estudianteService.update_Estudiante(_id, estudianteActualizado).subscribe(
        (estudiante: Estudiante) => {
          this.presentToast("Datos actualizados");
          this.mostrarInformacionEstudiante=false;
        },
        (error) => {
          console.error('Error al actualizar estudiante:', error);
        }
      );
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  async presentConfirm(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: '¿Estás seguro de que quieres eliminar esta planificacion?',
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
  

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
  
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
  
    return [year, month, day].join('-');
  }
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedFile = fileInput.files[0];
    }
  
  }

}
