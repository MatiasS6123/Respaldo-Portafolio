import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule y ReactiveFormsModule

import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { GestionUsuarioComponent } from './gestion-usuario/gestion-usuario.component';
import { ListEstudentComponent } from './list-estudent/list-estudent.component';
import { ListaUsuarioComponent } from './lista-usuario/lista-usuario.component';
import { BuscarCursoComponent } from './buscar-curso/buscar-curso.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { GestionNotaComponent } from './gestion-nota/gestion-nota.component';
import { ListaCursoComponent } from './lista-curso/lista-curso.component';
import { BuscarEstudianteComponent } from './buscar-estudiante/buscar-estudiante.component';
import { GestionApoderadoComponent } from './gestion-apoderado/gestion-apoderado.component';
import { ListaApoderadoComponent } from './lista-apoderado/lista-apoderado.component';
import { ListaAsistenciaComponent } from './lista-asistencia/lista-asistencia.component';
import { ListaAnotacionComponent } from './lista-anotacion/lista-anotacion.component';
import { ListaPlanificacionComponent } from './lista-planificacion/lista-planificacion.component';
import { GestionPlanificacionComponent } from './gestion-planificacion/gestion-planificacion.component';
import { ListaCitacionApoderadoComponent } from './lista-citacion-apoderado/lista-citacion-apoderado.component';
import { ListaCitacionComponent } from './lista-citacion/lista-citacion.component';
import { GestionAnotacionComponent } from './gestion-anotacion/gestion-anotacion.component';
import { GestionCitacionComponent } from './gestion-citacion/gestion-citacion.component';
import { ListaAnotacionProfesorComponent } from './lista-anotacion-profesor/lista-anotacion-profesor.component';
import { ListaCursosDirectoraComponent } from './lista-cursos-directora/lista-cursos-directora.component';
import { ListaNotasProfesorComponent } from './lista-notas-profesor/lista-notas-profesor.component';
import { ListaNotasApoderadoComponent } from './lista-notas-apoderado/lista-notas-apoderado.component';

@NgModule({
  declarations: [RegistroComponent,LoginComponent,GestionUsuarioComponent,ListEstudentComponent,ListaUsuarioComponent,
  BuscarCursoComponent,BitacoraComponent,GestionNotaComponent,ListaCursoComponent,BuscarEstudianteComponent,
  GestionApoderadoComponent,ListaApoderadoComponent,ListaAsistenciaComponent,ListaAnotacionComponent,ListaPlanificacionComponent,GestionPlanificacionComponent,ListaCitacionApoderadoComponent,
  ListaCitacionComponent,GestionAnotacionComponent,GestionCitacionComponent,ListaAnotacionProfesorComponent,ListaCursosDirectoraComponent,ListaNotasProfesorComponent,ListaNotasApoderadoComponent 
],
  imports: [
    CommonModule,
    IonicModule, // Importa IonicModule
    FormsModule, // Importa FormsModule
    ReactiveFormsModule // Importa ReactiveFormsModule
  ],
  exports: [RegistroComponent],
})
export class RegistroModule { }
