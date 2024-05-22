import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroApoderadoPage } from './registro-apoderado.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroApoderadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroApoderadoPageRoutingModule {}
