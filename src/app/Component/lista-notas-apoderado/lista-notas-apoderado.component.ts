import { Component, OnInit } from '@angular/core';
import { NotaService } from 'src/app/Service/nota.service';
import { UserService } from 'src/app/Service/user.service';
import { Nota } from 'src/models/nota';

@Component({
  selector: 'app-lista-notas-apoderado',
  templateUrl: './lista-notas-apoderado.component.html',
  styleUrls: ['./lista-notas-apoderado.component.scss'],
})
export class ListaNotasApoderadoComponent  implements OnInit {

  //Este es
  notasEstudiantes: { nombre: string, rut: string, notas: number[] }[] = [];
  notas:Nota[]=[]
  constructor(private userService:UserService,private notaService:NotaService) { }

  ngOnInit() {
    this.get_Notas_Apoderado();
  }

  get_Notas_Apoderado(){
    this.userService.getUserInfo().subscribe(
      (usuario)=>{
        const rut_apoderado=usuario.rut;
        this.notaService.obtener_Nota_Apoderado(rut_apoderado).subscribe(
          (nota)=>{
            this.notas=nota;
            this.procesarNotas(nota)
            console.log("Datos")
          }
        )



      }
    )

  }
  procesarNotas(notas: any[]) {
    this.notasEstudiantes = [];
    notas.forEach(curso => {
      curso.notas.forEach(estudiante => {
        const notasNumericas = estudiante.nota.map(n => Object.values(n)).flat().map(Number);
        console.log('Notas Numericas:', notasNumericas);
        if (this.notasEstudiantes.find(est => est.rut === estudiante.rut)) {
          const estIndex = this.notasEstudiantes.findIndex(est => est.rut === estudiante.rut);
          this.notasEstudiantes[estIndex].notas.push(...notasNumericas);
        } else {
          this.notasEstudiantes.push({
            nombre: estudiante.nombre,
            rut: estudiante.rut,
            notas: notasNumericas
          });
        }
      });
    });
  }
  obtenerNotasAlumno(notasArray: any[]): number[] {
    return notasArray.map(notaObj => Object.values(notaObj).map(Number)).flat();
  }
  
}
