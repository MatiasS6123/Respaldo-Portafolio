import { Component, OnInit } from '@angular/core';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { Estudiante } from 'src/models/Estudiante';

@Component({
  selector: 'app-list-estudent',
  templateUrl: './list-estudent.component.html',
  styleUrls: ['./list-estudent.component.scss'],
})
export class ListEstudentComponent  implements OnInit {

  students!:Estudiante[];

  constructor(private estudentService:EstudianteService) { }

  ngOnInit():void {
    this.getEstudents();
  }

  getEstudents():void{
    this.estudentService.getEstudiantes().subscribe(estudents=>
        this.students=estudents  
      )

  }

}
