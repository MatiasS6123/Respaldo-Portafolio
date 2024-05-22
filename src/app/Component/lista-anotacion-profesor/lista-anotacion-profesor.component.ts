import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AnotacionService } from 'src/app/Service/anotacion.service';
import { UserService } from 'src/app/Service/user.service';
import { Anotacion } from 'src/models/anotacion';

@Component({
  selector: 'app-lista-anotacion-profesor',
  templateUrl: './lista-anotacion-profesor.component.html',
  styleUrls: ['./lista-anotacion-profesor.component.scss'],
})
export class ListaAnotacionProfesorComponent  implements OnInit {

  anotaciones:Anotacion[]=[];
  filteredAnotacion!:Anotacion[];
  searchValue!:string;

  constructor(private userService:UserService,private anotacionService:AnotacionService,
    private router:Router
  ) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(
      (usuario)=>{
        const rut_profesor=usuario.rut;
        this.anotacionService.obtener_Anotaciones_profesor(rut_profesor).subscribe(
          (anotacion)=>{
            this.anotaciones=anotacion;
            this.filteredAnotacion=this.anotaciones
            console.log(anotacion)
          }
        )
      }
    )
  }
  searchAnotacion() {
    console.log('Valor de búsqueda:', this.searchValue);
    if(this.searchValue) {
      this.filteredAnotacion = this.anotaciones.filter(user => user.nombre_curso === this.searchValue);
    } else {
      this.filteredAnotacion = this.anotaciones;
    }
    console.log('Usuarios filtrados:', this.filteredAnotacion);
  }
  redirigir_Buscar_Anotacion(_id:string){
    this.router.navigate(['/gestion-anotacion',_id])
  }
}
