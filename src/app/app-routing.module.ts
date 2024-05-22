import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './Component/registro/registro.component';
import { LoginComponent } from './Component/login/login.component';
import { AuthGuard } from './guard/auth';
import { GestionUsuarioComponent } from './Component/gestion-usuario/gestion-usuario.component';
import { ListEstudentComponent } from './Component/list-estudent/list-estudent.component';
import { ListaUsuarioComponent } from './Component/lista-usuario/lista-usuario.component';
import { BuscarCursoComponent } from './Component/buscar-curso/buscar-curso.component';
import { BitacoraComponent } from './Component/bitacora/bitacora.component';
import { GestionNotaComponent } from './Component/gestion-nota/gestion-nota.component';
import { ListaCursoComponent } from './Component/lista-curso/lista-curso.component';
import { BuscarEstudianteComponent } from './Component/buscar-estudiante/buscar-estudiante.component';
import { GestionApoderadoComponent } from './Component/gestion-apoderado/gestion-apoderado.component';
import { ListaApoderadoComponent } from './Component/lista-apoderado/lista-apoderado.component';
import { ListaAsistenciaComponent } from './Component/lista-asistencia/lista-asistencia.component';
import { ListaAnotacionComponent } from './Component/lista-anotacion/lista-anotacion.component';
import { ListaPlanificacionComponent } from './Component/lista-planificacion/lista-planificacion.component';
import { GestionPlanificacionComponent } from './Component/gestion-planificacion/gestion-planificacion.component';
import { ListaCitacionApoderadoComponent } from './Component/lista-citacion-apoderado/lista-citacion-apoderado.component';
import { ListaCitacionComponent } from './Component/lista-citacion/lista-citacion.component';
import { GestionCitacionComponent } from './Component/gestion-citacion/gestion-citacion.component';
import { GestionAnotacionComponent } from './Component/gestion-anotacion/gestion-anotacion.component';
import { ListaAnotacionProfesorComponent } from './Component/lista-anotacion-profesor/lista-anotacion-profesor.component';
import { ListaCursosDirectoraComponent } from './Component/lista-cursos-directora/lista-cursos-directora.component';
import { ListaNotasApoderadoComponent } from './Component/lista-notas-apoderado/lista-notas-apoderado.component';

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
    loadChildren: () => import('./Page/estudiantes/estudiantes.module').then( m => m.EstudiantesPageModule),
    canActivate:[AuthGuard]
  },
  {path: 'gestion-estudiante/:_id',component:BuscarEstudianteComponent,
  canActivate:[AuthGuard]},
  {
    path: 'salida-estudiante',
    loadChildren: () => import('./Page/salida-estudiante/salida-estudiante.module').then( m => m.SalidaEstudiantePageModule),
    canActivate:[AuthGuard]

  },
  {
    path: 'asistencia/:nombreCurso',
    loadChildren: () => import('./Page/asistencia/asistencia.module').then( m => m.AsistenciaPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'ver-asistencia',
    component:ListaAsistenciaComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'ver-anotacion',
    component:ListaAnotacionComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'gestion-usuario/:_id',
    component:GestionUsuarioComponent,
    canActivate:[AuthGuard  ]
  },
  {
    path:'lista-estudiante',
    component:ListEstudentComponent
  },
  {
    path:'lista-usuario',
    component:ListaUsuarioComponent
  },
  {
    path: 'asignar-curso',
    loadChildren: () => import('./Page/gestion-curso/gestion-curso.module').then( m => m.GestionCursoPageModule)
  },
  
  {
    path:'ver-lista-cursos-directora',
    component:ListaCursosDirectoraComponent
  },

  {
    path:'gestion-curso/:_id',
    component:BuscarCursoComponent
  },
  {
    path:'bitacora/:nombreCurso',
    component:BitacoraComponent

  },
  {
    path: 'nota/:nombreCurso',
    loadChildren: () => import('./Page/nota/nota.module').then( m => m.NotaPageModule)
  },
  {
    path:'gestion-nota',
    component:GestionNotaComponent
  },
  {
    path:'lista-apoderado-notas',
    component:ListaNotasApoderadoComponent
  },
  {
    path:'lista-curso',
    component:ListaCursoComponent
  },
  {
    path:'gestion-apoderado/:_id',
    component:GestionApoderadoComponent
  },
  ,
  {
    path:'lista-apoderado',
    component:ListaApoderadoComponent
  },
  {
    path: 'anotacion/:nombreCurso',
    loadChildren: () => import('./Page/anotacion/anotacion.module').then( m => m.AnotacionPageModule)
  },
  {
    path: 'citacion/:nombreCurso',
    loadChildren: () => import('./Page/citacion/citacion.module').then( m => m.CitacionPageModule)
  },
  {
    path: 'ver-citacion-apoderado',
    component:ListaCitacionApoderadoComponent  
  },
  {
    path: 'lista-citacion',
    component:ListaCitacionComponent  
  },
  {
    path: 'registro-apoderado',
    loadChildren: () => import('./Page/registro-apoderado/registro-apoderado.module').then( m => m.RegistroApoderadoPageModule)
  },
  {
    path: 'planificar-clase',
    loadChildren: () => import('./Page/planificar-clase/planificar-clase.module').then( m => m.PlanificarClasePageModule)
  }
  ,{
    path:'lista-planificacion',
    component:ListaPlanificacionComponent
  }
  ,{
    path:'ver-anotacion-apoderado',
    component:ListaAnotacionComponent
  }
  ,{
    path:'lista-anotacion-profesor',
    component:ListaAnotacionProfesorComponent
  }
  ,{
    path:'gestion-planificacion/:_id',
    component:GestionPlanificacionComponent
  }
  ,{
    path:'gestion-citacion/:_id',
    component:GestionCitacionComponent
  }
  ,{
    path:'gestion-anotacion/:_id',
    component:GestionAnotacionComponent
  },
  {
    path: 'registro-ingreso',
    loadChildren: () => import('./Page/registro-ingreso/registro-ingreso.module').then( m => m.RegistroIngresoPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
