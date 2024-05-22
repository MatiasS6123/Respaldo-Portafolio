import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitacionService } from 'src/app/Service/citacion.service';
import { UserService } from 'src/app/Service/user.service';
import { Citacion } from 'src/models/citacion';

@Component({
  selector: 'app-lista-citacion',
  templateUrl: './lista-citacion.component.html',
  styleUrls: ['./lista-citacion.component.scss'],
})
export class ListaCitacionComponent  implements OnInit {
  citaciones:Citacion[];
  filteredCitacion!:Citacion[];
  searchValue!:string;

  constructor(private userService:UserService,private citacionService:CitacionService,
    private router:Router
  ) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(
      (usuario)=>{
        const rut_profesor=usuario.rut;
        this.citacionService.obtener_Citacion_Profesor(rut_profesor).subscribe(
          (citacion)=>{
            this.citaciones=citacion;
            this.filteredCitacion=this.citaciones
            console.log(citacion)
          }
        )
      }
    )
  }
  searchCitacion() {
    console.log('Valor de búsqueda:', this.searchValue);
    if(this.searchValue) {
      this.filteredCitacion = this.citaciones.filter(user => user.nombre_curso === this.searchValue);
    } else {
      this.filteredCitacion = this.citaciones;
    }
    console.log('Usuarios filtrados:', this.filteredCitacion);
  }
  redirigir_Buscar_citacion(_id:string){
    this.router.navigate(['/gestion-citacion',_id])
  }


}
