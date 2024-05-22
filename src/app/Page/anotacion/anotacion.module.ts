import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnotacionPageRoutingModule } from './anotacion-routing.module';

import { AnotacionPage } from './anotacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnotacionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AnotacionPage]
})
export class AnotacionPageModule {}
