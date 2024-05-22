import { Component, OnInit } from '@angular/core';
import { CitacionService } from 'src/app/Service/citacion.service';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/models/User';
import { Citacion } from 'src/models/citacion';

@Component({
  selector: 'app-lista-citacion-apoderado',
  templateUrl: './lista-citacion-apoderado.component.html',
  styleUrls: ['./lista-citacion-apoderado.component.scss'],
})
export class ListaCitacionApoderadoComponent  implements OnInit {
  citaciones:Citacion[]= []

  constructor(private userService:UserService,private citacionService:CitacionService) { }

  ngOnInit() {
    this.obtener_Citacion();
  }

  obtener_Citacion(){
    this.userService.getUserInfo().subscribe(
      (usuario)=>{
        const rut_apoderado=usuario.rut;
        this.citacionService.obtener_Citacion(rut_apoderado).subscribe(
          (citacion)=>{
            this.citaciones=citacion;
          }
        )
      }
    )
  }

}
