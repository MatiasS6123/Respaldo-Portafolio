import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroIngresoPage } from './registro-ingreso.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroIngresoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroIngresoPageRoutingModule {}
