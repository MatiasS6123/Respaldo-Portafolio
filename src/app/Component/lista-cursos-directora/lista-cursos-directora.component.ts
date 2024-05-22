import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestionCService } from 'src/app/Service/gestion-c.service';
import { GestionCurso } from 'src/models/gestionC';

@Component({
  selector: 'app-lista-cursos-directora',
  templateUrl: './lista-cursos-directora.component.html',
  styleUrls: ['./lista-cursos-directora.component.scss'],
})
export class ListaCursosDirectoraComponent  implements OnInit {
  gestionCurso!:GestionCurso[];
  filteredCursos!:GestionCurso[];
  searchValue!:string;


  constructor(private router:Router,private gestionCservice:GestionCService) { }

  ngOnInit() {
    this.get_All_Cursos();
  }

  get_All_Cursos(){
    this.gestionCservice.get_All_Cursos().subscribe(
      (curso)=>{
        this.gestionCurso=curso;
        this.filteredCursos=this.gestionCurso;
        console.log(curso)
      }
    )
  }
  redirigir_Gestion_Curso(_id:string){
    this.router.navigate(['/gestion-curso',_id])
  }

  searchCurso() {
    console.log('Valor de búsqueda:', this.searchValue);
    if(this.searchValue) {
      this.filteredCursos = this.gestionCurso.filter(curso => curso.nombreCurso === this.searchValue);
    } else {
      this.filteredCursos = this.gestionCurso;
    }
    console.log('Usuarios filtrados:', this.filteredCursos);
  }
  
  

}
