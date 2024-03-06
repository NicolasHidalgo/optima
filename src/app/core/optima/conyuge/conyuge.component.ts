import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OptimaService } from '../../../services/optima.service';
import { StepsModule} from 'primeng/steps';
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { InputGroupModule } from 'primeng/inputgroup';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { IOptima } from '../../../interface/IOptima';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-conyuge',
  standalone: true,
  imports: [StepsModule, CommonModule, FormsModule, ReactiveFormsModule
    , ButtonModule, CardModule, InputTextModule, InputGroupModule, CalendarModule],
  templateUrl: './conyuge.component.html',
  providers:[]
})
export class ConyugeComponent {

  info: IOptima = {
    dni: '',
    nombres: '',
    apellidos: '',
    edad: 0,
    ciudad: '',
    fecNac: undefined,
    fecNacCon: undefined,
    fecRegistro: undefined
  };
  submitted: boolean = false;
  form: FormGroup;
  constructor(public optimaService: OptimaService, private router: Router
    , private formBuilder: FormBuilder) { 

    this.form = this.formBuilder.group({
      fecNacimiento: ['', Validators.required],
      fecNacimientoConyuge: [''],
    });
    this.submitted = false;
  }

  
  ngOnInit() { 
    if (typeof(Storage) !== 'undefined') {
      // Código cuando Storage es compatible
      const _info = sessionStorage.getItem('info');
      this.info = JSON.parse(_info || '{}') as IOptima;
    } else {
     // Código cuando Storage NO es compatible
    }
    
  }

  prevPage() {
    this.router.navigate(['optima/personal']);
  }
  private getNowUTC() {
    const now = new Date();
    return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  }
  nextPage() {
    if (this.form.controls['fecNacimiento'].value) {
        this.router.navigate(['optima/academico']);

        this.info.fecNac = this.form.controls['fecNacimiento'].value;
        this.info.fecNacCon = this.form.controls['fecNacimientoConyuge'].value;
        this.info.fecRegistro = this.getNowUTC();
        sessionStorage.setItem('info', JSON.stringify(this.info));
        return;
    }else{
      alert('Formulario inválido');
    }

    //this.submitted = true;
  }
}
