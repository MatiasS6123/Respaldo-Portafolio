import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanificarClasePageRoutingModule } from './planificar-clase-routing.module';

import { PlanificarClasePage } from './planificar-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanificarClasePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PlanificarClasePage]
})
export class PlanificarClasePageModule {}
