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
    numero_matricula_estudiante:'',
    nombre: '',
    apellido: '',
    edad: 0,
    sexo: '',
    nacionalidad: '',
    fecha_nac: new Date(),
    tiene_enfermedad: false,
    tipo_enferemedad: '',
    descripcion_enfermedad: '',
    certificado_enfermedad: ''
  };
  files: { [key: string]: File } = {};
  constructor(private formBuilder: FormBuilder, private estudianteService: EstudianteService, private toastController: ToastController) {

  }

  ngOnInit(): void {
    this.estudianteForm = this.formBuilder.group({
      rut: ['', Validators.required],
      numero_matricula_estudiante:['',Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [0, Validators.required],
      sexo: ['', Validators.required],
      nacionalidad: ['', Validators.required], // Agregado el campo de nacionalidad al formulario
      fecha_nac: [new Date().toISOString(), Validators.required],
      tiene_enfermedad: [false, Validators.required],
      tipo_enfermedad: [''],
      descripcion_enfermedad: [''],
      certificado_enfermedad: ['']
    });
  }

  guardarEstudiante() {
    if (this.estudianteForm.valid) {
      const fechaNacimientoISO = this.estudianteForm.get('fecha_nac')?.value;
      this.estudianteForm.patchValue({ fecha_nac: fechaNacimientoISO });

      // Obtén el archivo de certificado de enfermedad
      if (this.files['certificado_enfermedad']) {
        const file = this.files['certificado_enfermedad'];
        console.log('Estudiante a guardar:', this.estudianteForm.value);
        this.estudiante = this.estudianteForm.value;
        this.estudianteService.createEstudiante(this.estudiante, file).subscribe(
          (res) => {
            console.log('Estudiante guardado correctamente:', res);
            this.presentToast("Estudiante registrado con éxito");
            this.estudianteForm.reset();
            this.files = {}; // Reinicia los archivos después de guardar
          },
          (error) => {
            console.error('Error al guardar estudiante:', error);
            this.presentToast("Error Al guardar Estudiante Rut o Numero de matricula duplicados");
          }
        );

      }


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
  onFileChange(event, field) {
    if (event.target.files.length > 0) {
      this.files[field] = event.target.files[0];
    }
  }
}
