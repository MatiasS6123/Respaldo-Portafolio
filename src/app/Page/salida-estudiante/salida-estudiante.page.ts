import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SalidaService } from 'src/app/Service/salida.service';

@Component({
  selector: 'app-salida-estudiante',
  templateUrl: './salida-estudiante.page.html',
  styleUrls: ['./salida-estudiante.page.scss'],
})
export class SalidaEstudiantePage implements OnInit {

  salidaForm: FormGroup; // Declarar el FormGroup

  constructor(private fb: FormBuilder, private salidaEstudianteService: SalidaService,
    private toastController: ToastController) {
    
    this.salidaForm = this.fb.group({ // Inicializar el FormGroup
      nombreEstudiante: ['', Validators.required],
      quienRetira: ['', Validators.required],
      foto: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.salidaForm.value); // Log para ver los valores del formulario
  }
  ngOnInit() {
  }

  guardarSalidaEstudiante() {
    if (this.salidaForm.valid) {
      // Obtiene la fecha actual y la formatea al formato 'dd/mm/yyyy'
      const fechaActual = new Date().toISOString().split('T')[0].split('-').reverse().join('/');

      // Agrega la fecha al objeto de salida de estudiante
      const salidaEstudianteData = {
        ...this.salidaForm.value,
        fecha: fechaActual
      };

      this.salidaEstudianteService.GuardarSalida(salidaEstudianteData)
        .subscribe(
          (res) => {
            console.log('Salida de estudiante guardada correctamente:', res);
            this.presentToast('Registro guardado con extio');
            this.salidaForm.reset(); // Reinicia el formulario después de guardar
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


}


