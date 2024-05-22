import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../Service/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  isLoggedIn: boolean = false;
  constructor(private userService:UserService,private toastController:ToastController) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.isLoggedIn= this.userService.isAuthenticated();
    const toastMessage = localStorage.getItem('toastMessage');
    if (toastMessage) {
      this.presentToast(toastMessage);
      localStorage.removeItem('toastMessage'); // Eliminar el mensaje del almacenamiento local después de mostrarlo
    }
    
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
