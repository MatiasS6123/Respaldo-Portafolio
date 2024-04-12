import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.scss'],
})
export class ListaUsuarioComponent  implements OnInit {

  users!:User[];

  constructor(private userService:UserService) { }

  ngOnInit():void {
    this.getUser();
  }

  getUser(){
    this.userService.getUser().subscribe(user=> this.users=user)
  }

}
