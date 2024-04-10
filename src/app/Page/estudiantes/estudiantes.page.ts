import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from 'src/models/Estudiante';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { ToastController } from '@ionic/angular';

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
  customPickerOptions: any;
  constructor(private formBuilder: FormBuilder, private estudianteService: EstudianteService,private toastController: ToastController) {
    this.customPickerOptions = {
      cssClass: 'my-custom-picker'
    };
  }

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
      // Obtiene la fecha de nacimiento del formulario en formato ISO 8601
      const fechaNacimientoISO = this.estudianteForm.get('fecha_nac')?.value;
      
      // Asigna la fecha ISO 8601 al formulario
      this.estudianteForm.patchValue({ fecha_nac: fechaNacimientoISO });
      
      console.log('Estudiante a guardar:', this.estudianteForm.value);
      this.estudiante = this.estudianteForm.value;
      this.estudianteService.createEstudiante(this.estudiante).subscribe(
        (res) => {
          console.log('Estudiante guardado correctamente:', res);
          this.presentToast("Estudiante registrado con éxito");
          this.estudianteForm.reset(); // Reinicia el formulario después de guardar
        },
        (error) => {
          console.error('Error al guardar estudiante:', error);
          this.presentToast("Error al registrar al estudiante, verifique el RUT o la información");
        }
      );
    } else {
      console.error('Formulario de estudiante inválido. Por favor, revise los campos.');
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
}
