import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionCursoPageRoutingModule } from './gestion-curso-routing.module';

import { GestionCursoPage } from './gestion-curso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionCursoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GestionCursoPage]
})
export class GestionCursoPageModule {}
