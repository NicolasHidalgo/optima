import { Component } from '@angular/core';
import { OptimaService } from '../../../services/optima.service';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { IOptima } from '../../../interface/IOptima';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [CardModule, ButtonModule, DatePipe],
  templateUrl: './confirmacion.component.html',
  styleUrl: './confirmacion.component.css',
  providers: []
})
export class ConfirmacionComponent {

  info: IOptima = {
    dni: '',
    nombres: '',
    apellidos: '',
    edad: 0,
    ciudad: '',
    fecNac: undefined,
    fecNacCon: undefined,
    fecRegistro: undefined,
    universidad: '',
    trabajo: '',
    salario: 0,
    carrera: '',
    experiencia: 0
  };
    
    constructor(public optimaService: OptimaService, private router: Router) { }

    ngOnInit() { 
      if (typeof(Storage) !== 'undefined') {
        // Código cuando Storage es compatible
        const _info = sessionStorage.getItem('info');
        this.info = JSON.parse(_info || '{}') as IOptima;
        console.log(this.info);
      } else {
       // Código cuando Storage NO es compatible
      }
    }


    complete() {
      console.log(this.info);
      this.optimaService.guardar(this.info).subscribe();
    }

    prevPage() {
      this.router.navigate(['optima/academico']);
    }
}
