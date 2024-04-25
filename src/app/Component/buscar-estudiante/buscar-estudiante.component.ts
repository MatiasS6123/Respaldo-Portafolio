import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { Estudiante } from 'src/models/Estudiante';

@Component({
  selector: 'app-buscar-estudiante',
  templateUrl: './buscar-estudiante.component.html',
  styleUrls: ['./buscar-estudiante.component.scss'],
})
export class BuscarEstudianteComponent  implements OnInit {

  estudianteForm!: FormGroup;
  buscarForm!: FormGroup;
  estudianteEncontrado: Estudiante | null = null;
  mostrarInformacionEstudiante: boolean = false;
  edicionHabilitada: boolean = false;

  constructor(private formBuilder: FormBuilder, private estudianteService: EstudianteService, private toastController:ToastController) {}

  ngOnInit() {
    this.initEstudianteForm();
    this.initBuscarForm();
  }

  private initEstudianteForm(): void {
    this.estudianteForm = this.formBuilder.group({
      rut: [{value: '', disabled: true}, [Validators.required]], // Ejemplo de validación para un RUT chileno
      nombre: [{value: '', disabled: true}, Validators.required],
      apellido: [{value: '', disabled: true}, Validators.required],
      edad: [{value: '', disabled: true}, [Validators.required, Validators.min(0), Validators.max(120)]], // Suponiendo una edad válida entre 0 y 120 años
      sexo: [{value: '', disabled: true}, Validators.required],
      nacionalidad: [{value: '', disabled: true}, Validators.required],
      fecha_nac: [{value: '', disabled: true}, Validators.required] // Podrías agregar un validador de fecha personalizado si es necesario
    });
  }

  private initBuscarForm(): void {
    this.buscarForm = this.formBuilder.group({
      rut: ['', [Validators.required]]
    });
  }

  buscarEstudiante() {
    this.estudianteService.getEstudianteById(this.buscarForm.get('rut')?.value).subscribe(
      (estudiante: any) => {
        console.log('Estudiante encontrado:', estudiante);
  
        if (estudiante) {
          this.estudianteEncontrado = estudiante;
          this.mostrarInformacionEstudiante = true;
          // Parsear la fecha antes de asignarla al formulario
          estudiante.fecha_nac = estudiante.fecha_nac.split('T')[0]; // Obtener solo la parte de la fecha (YYYY-MM-DD)
          this.estudianteForm.patchValue(estudiante); // Actualizar el formulario con los datos del estudiante encontrado
          this.estudianteForm.disable();
        } else {
          
          console.error('Estudiante no encontrado');
          this.estudianteEncontrado = null;
          this.mostrarInformacionEstudiante = false;
        }
      },
      (error) => {
        this.presentToast("Rut invalido o no existe")
        console.error('Error al buscar estudiante:', error);
      }
    );
  }

  habilitarEdicion() {
    this.estudianteForm.enable(); 
    this.edicionHabilitada=true;// Habilitar todos los campos del formulario
  }

  eliminarEstudiante() {
    const rut = this.estudianteForm.get('rut')?.value;
    if (!rut) {
      this.presentToast('No se proporcionó un RUT válido para eliminar el estudiante');
      return;
    }

    this.estudianteService.deleteEstudiante(rut).subscribe(
      () => {
        this.presentToast('Estudiante eliminado correctamente');
        this.estudianteEncontrado = null;
        this.mostrarInformacionEstudiante = false;
        this.estudianteForm.reset();
      },
      (error) => {
        this.presentToast("Error al eliminar estudiante")
        console.error('Error al eliminar estudiante:', error);
      }
    );
  }

  actualizarEstudiante() {
    if (this.estudianteForm.invalid) {
      this.presentToast('El formulario es inválido. Corrige los campos resaltados.');
      return;
    }

    const estudianteActualizado: Estudiante = this.estudianteForm.value;
    this.estudianteService.updateEstudiante(estudianteActualizado.rut, estudianteActualizado).subscribe(
      (estudiante: Estudiante) => {
        this.presentToast('Estudiante actualizado correctamente:');
        this.estudianteEncontrado = estudiante;
        // Aquí puedes realizar alguna acción adicional después de actualizar el estudiante, si es necesario
        this.estudianteForm.disable();
      },
      (error) => {
        console.error('Error al actualizar estudiante:', error);
      }
    );
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
