import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './Component/registro/registro.component';
import { LoginComponent } from './Component/login/login.component';
import { ListaEstudianteComponent } from './Component/lista-estudiante/lista-estudiante.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },   
  {
    path: 'estudiantes',
    loadChildren: () => import('./Page/estudiantes/estudiantes.module').then( m => m.EstudiantesPageModule)
  },
  {path: 'lista-estudiante',component:ListaEstudianteComponent},
  {
    path: 'salida-estudiante',
    loadChildren: () => import('./Page/salida-estudiante/salida-estudiante.module').then( m => m.SalidaEstudiantePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
