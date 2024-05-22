import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnotacionService } from 'src/app/Service/anotacion.service';
import { UserService } from 'src/app/Service/user.service';
import { Anotacion } from 'src/models/anotacion';

@Component({
  selector: 'app-lista-anotacion',
  templateUrl: './lista-anotacion.component.html',
  styleUrls: ['./lista-anotacion.component.scss'],
})
export class ListaAnotacionComponent  implements OnInit {

  anotaciones:Anotacion[]= [];

  constructor(private userService:UserService,private anotacionService:AnotacionService, private router:Router) { }

  ngOnInit() {
    this.obtener_Anotacion();
  }

  obtener_Anotacion(){
    this.userService.getUserInfo().subscribe(
      (usuario)=>{
        const rut_apoderado=usuario.rut;
        this.anotacionService.obtener_Anotacion_Apoderado(rut_apoderado).subscribe(
          (anotacion)=>{
            this.anotaciones=anotacion
            console.log(anotacion)

          }
        )

      }
    );
  }
}
