import { Component } from '@angular/core';
import { UserService } from './Service/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoggedIn: boolean = false;
  
  constructor(private authService: UserService) { 
   this.isLoggedIn=true;
    
  }

  ionViewWillEnter() {
    this.isLoggedIn = this.authService.isAuthenticated();
  }
}

