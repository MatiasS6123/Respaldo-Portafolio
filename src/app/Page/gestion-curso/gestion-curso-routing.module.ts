import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionCursoPage } from './gestion-curso.page';

const routes: Routes = [
  {
    path: '',
    component: GestionCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionCursoPageRoutingModule {}
