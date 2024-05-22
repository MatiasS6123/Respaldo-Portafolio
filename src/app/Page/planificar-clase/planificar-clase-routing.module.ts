import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanificarClasePage } from './planificar-clase.page';

const routes: Routes = [
  {
    path: '',
    component: PlanificarClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanificarClasePageRoutingModule {}
