import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from 'src/app/Service/asistencia.service';
import { UserService } from 'src/app/Service/user.service';
import { Asistencia } from 'src/models/asistencia';

@Component({
  selector: 'app-lista-asistencia',
  templateUrl: './lista-asistencia.component.html',
  styleUrls: ['./lista-asistencia.component.scss'],
})
export class ListaAsistenciaComponent  implements OnInit {
  asistencias:Asistencia[]= [];

  constructor(private userService:UserService,private asistenciaService:AsistenciaService) { }

  ngOnInit() {
    this.obtenerAsistencia();
  }

  obtenerAsistencia(){
    this.userService.getUserInfo().subscribe(
      (usuario)=>{
        const rut_apoderado=usuario.rut;
        this.asistenciaService.obtener_Asistencia(rut_apoderado).subscribe(
          (asistencia)=>{
            this.asistencias=asistencia
            console.log(asistencia)

          }
        )

      }
    );
  }
}
