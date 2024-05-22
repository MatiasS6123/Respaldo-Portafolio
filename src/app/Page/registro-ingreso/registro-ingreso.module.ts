import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroIngresoPageRoutingModule } from './registro-ingreso-routing.module';

import { RegistroIngresoPage } from './registro-ingreso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroIngresoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistroIngresoPage]
})
export class RegistroIngresoPageModule {}
