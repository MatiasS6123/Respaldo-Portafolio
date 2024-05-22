import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApoderadoServiceService } from 'src/app/Service/apoderado-service.service';
import { Apoderado } from 'src/models/apoderado';

@Component({
  selector: 'app-lista-apoderado',
  templateUrl: './lista-apoderado.component.html',
  styleUrls: ['./lista-apoderado.component.scss'],
})
export class ListaApoderadoComponent  implements OnInit {

  apoderados:Apoderado[]=[];
  filteredApoderado!:Apoderado[];
  searchValue!:string;


  constructor(private apoderadoService:ApoderadoServiceService,private router:Router) { }

  ngOnInit() {
    this.obtenerApoderado();
  }

  obtenerApoderado(){
    this.apoderadoService.get_Apoderado().subscribe(
      (apoderado:any)=>{
        this.apoderados=apoderado;
        this.filteredApoderado=this.apoderados


      }
  )
  
}

redirigir_Buscar_Apoderado(_id:string){
  this.router.navigate(['/gestion-apoderado',_id])
}
searchUser() {
  console.log('Valor de búsqueda:', this.searchValue);
  if(this.searchValue) {
    this.filteredApoderado = this.apoderados.filter(apoderado => apoderado.rut_apoderado === this.searchValue);
  } else {
    this.filteredApoderado = this.apoderados;
  }
  console.log('Usuarios filtrados:', this.filteredApoderado);
}


}
