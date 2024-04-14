import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { BitacoraService } from 'src/app/Service/bitacora.service';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss'],
})
export class BitacoraComponent implements OnInit {

  bitacoraForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bitacoraService: BitacoraService,
    private toastController: ToastController
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }
  
  inicializarFormulario(): void {
    this.bitacoraForm = this.formBuilder.group({
      nombreCurso: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  guardarBitacora() {
    if (this.bitacoraForm.valid) {
      const bitacoraData = {
        ...this.bitacoraForm.value,
        fecha: new Date()
      };
  
      this.bitacoraService.guardarBitacora(bitacoraData).subscribe(
        (res) => {
          console.log('Bitácora guardada con éxito:', res);
          this.presentToast('Bitácora guardada con éxito');
          this.bitacoraForm.reset();
        },
        (error) => {
          console.error('Error al guardar la bitácora:', error);
          this.presentToast('Error al guardar la bitácora');
        }
      );
    } else {
      console.error('Formulario de bitácora inválido. Por favor, revise los campos.');
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
