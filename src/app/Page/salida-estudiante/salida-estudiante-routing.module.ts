import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalidaEstudiantePage } from './salida-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: SalidaEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalidaEstudiantePageRoutingModule {}
