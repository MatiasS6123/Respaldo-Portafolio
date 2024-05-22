import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitacionPageRoutingModule } from './citacion-routing.module';

import { CitacionPage } from './citacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitacionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CitacionPage]
})
export class CitacionPageModule {}
