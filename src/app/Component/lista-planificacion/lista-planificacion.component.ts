import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanificacionService } from 'src/app/Service/planificacion.service';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/models/User';
import { Planificacion } from 'src/models/planificar_clase';

@Component({
  selector: 'app-lista-planificacion',
  templateUrl: './lista-planificacion.component.html',
  styleUrls: ['./lista-planificacion.component.scss'],
})
export class ListaPlanificacionComponent  implements OnInit {

  planificaciones:Planificacion[]= [];
  constructor(private planificacionService:PlanificacionService, private userService:UserService,
    private router:Router
  ) { }

  ngOnInit() {
    this.obtener_Planificacion();
  }


  obtener_Planificacion(){
    this.userService.getUserInfo().subscribe(
      (usuario:User)=>{
        const rut_profesor=usuario.rut;
        this.planificacionService.obtener_Planificacion(rut_profesor).subscribe(
          (planificaciones)=>{
            this.planificaciones = planificaciones;
            console.log(planificaciones)
          }
        )
      }
    )
}

redirigir_Gestion_Planificacion(_id: string) {
  // Navegar a la página de asistencia con el ID del curso como parámetro
  this.router.navigate(['/gestion-planificacion', _id]);
}
}
