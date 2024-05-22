import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SalidaService } from 'src/app/Service/salida.service';
import { SalidaEstudiante } from 'src/models/salidaEstudiante';

@Component({
  selector: 'app-salida-estudiante',
  templateUrl: './salida-estudiante.page.html',
  styleUrls: ['./salida-estudiante.page.scss'],
})
export class SalidaEstudiantePage implements OnInit {

  salida:SalidaEstudiante={
    quien_retira:'',
    motivo_retiro:'',
    fecha_salida: new Date,
    nombre_estudiante:'',
    foto_cedula_quien_retira:'',
    foto_salida:''

  }
  salidaForm: FormGroup; // Declarar el FormGroup
  files: { [key: string]: File } = {};
  constructor(private fb: FormBuilder, private salidaEstudianteService: SalidaService,
    private toastController: ToastController) {
    
    this.salidaForm = this.fb.group({ // Inicializar el FormGroup
      nombre_estudiante: ['', Validators.required],
      quien_retira: ['', Validators.required],
      motivo_retiro:['',Validators.required],
      foto_salida: ['', Validators.required],
      foto_cedula_quien_retira: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.salidaForm.value); // Log para ver los valores del formulario
  }
  ngOnInit() {
  }

  guardarSalidaEstudiante() {
    if (this.salidaForm.valid) {
      const fechaActual = new Date().toISOString().split('T')[0];
  
      const salidaEstudianteData = {
        ...this.salidaForm.value,
        fecha_salida: fechaActual
      };

      console.log("Datos a guardar",salidaEstudianteData)
  
      this.salidaEstudianteService.GuardarSalida(salidaEstudianteData, this.files['foto_salida'], this.files['foto_cedula_quien_retira'])
        .subscribe(
          (res) => {
            console.log('Salida de estudiante guardada correctamente:', res);
            this.presentToast('Registro guardado con extio');
            this.salidaForm.reset();
            this.files = {}; // Reinicia los archivos después de guardar
          },
          (error) => {
            this.presentToast('Error al registrar verifique los datos');
          }
        );
    } else {
      console.error('Formulario de salida de estudiante inválido. Por favor, revise los campos.');
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


