import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.scss'],
})
export class ListaUsuarioComponent  implements OnInit {

  users!:User[];
  filteredUsers!:User[];
  searchValue!:string;

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit():void {
    this.getUser();
  }

  getUser(){
    this.userService.getUser().subscribe(
      user=>{
        this.users=user
        this.filteredUsers = this.users;
      }
    )
  }

  redirigir_Buscar_usuario(_id:string){
    this.router.navigate(['/gestion-usuario',_id])
  }
  searchUser() {
    console.log('Valor de búsqueda:', this.searchValue);
    if(this.searchValue) {
      this.filteredUsers = this.users.filter(user => user.rut === this.searchValue);
    } else {
      this.filteredUsers = this.users;
    }
    console.log('Usuarios filtrados:', this.filteredUsers);
  }
  
  
}
