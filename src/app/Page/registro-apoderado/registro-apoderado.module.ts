import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroApoderadoPageRoutingModule } from './registro-apoderado-routing.module';

import { RegistroApoderadoPage } from './registro-apoderado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroApoderadoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistroApoderadoPage]
})
export class RegistroApoderadoPageModule {}
