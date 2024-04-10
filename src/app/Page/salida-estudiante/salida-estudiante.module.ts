import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalidaEstudiantePageRoutingModule } from './salida-estudiante-routing.module';

import { SalidaEstudiantePage } from './salida-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalidaEstudiantePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SalidaEstudiantePage]
})
export class SalidaEstudiantePageModule {}
