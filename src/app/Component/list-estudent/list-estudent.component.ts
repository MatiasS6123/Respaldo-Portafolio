import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { Estudiante } from 'src/models/Estudiante';

@Component({
  selector: 'app-list-estudent',
  templateUrl: './list-estudent.component.html',
  styleUrls: ['./list-estudent.component.scss'],
})
export class ListEstudentComponent  implements OnInit {

  students:Estudiante[]=[];
  filteredEstudents!:Estudiante[];
  searchValue!:string;

  constructor(private estudentService:EstudianteService,private router:Router) { }

  ngOnInit():void {
    this.getEstudents();
  }

  getEstudents():void{
    this.estudentService.getEstudiantes().subscribe(
      estudents =>{
        if(estudents){
          

        this.students=estudents;
        this.filteredEstudents=this.students;
        }
         
      }
       
      )

  }
  searchUser() {
    console.log('Valor de búsqueda:', this.searchValue);
    if(this.searchValue) {
      this.filteredEstudents= this.students.filter(estudiante => estudiante.rut === this.searchValue);
    } else {
      this.filteredEstudents = this.students;
    }
    console.log('Usuarios filtrados:', this.filteredEstudents);
  }
 
  redirigir_Gestion_Estudiante(_id:string){
    this.router.navigate(['/gestion-estudiante',_id])
  }

}
