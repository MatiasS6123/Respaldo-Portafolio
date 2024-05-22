import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitacionPage } from './citacion.page';

const routes: Routes = [
  {
    path: '',
    component: CitacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitacionPageRoutingModule {}
