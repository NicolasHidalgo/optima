import { Component, ViewEncapsulation } from '@angular/core';
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

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [StepsModule, CommonModule, FormsModule, ReactiveFormsModule
    , ButtonModule, CardModule, InputTextModule, InputGroupModule],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PersonalComponent {

  lista: IOptima[] = [];
  personalInformation: IOptima = {
    dni: '',
    nombres: '',
    apellidos: '',
    edad: 0,
    ciudad: ''
  };
  submitted: boolean = false;
  
  
  form: FormGroup;
  constructor(public optimaService: OptimaService, private router: Router, private formBuilder: FormBuilder) { 

    this.form = this.formBuilder.group({
      dni: ['', Validators.required],
      nombres: [{value : '', disabled: true}, Validators.required],
      apellidos: [{value : '', disabled: true}, Validators.required],
      edad: [{value : '', disabled: true}],
      ciudad: [{value : '', disabled: true}]
    });
    this.submitted = false;
  }
  ngOnInit() { 
    this.optimaService.getData().subscribe(res => this.lista = res.data);
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  buscar(){
    console.log(this.lista);
    const _dni = this.form.value.dni;
    var found = this.lista.find(x => x.dni === _dni);
    console.log(found);
    this.form.controls['nombres'].setValue(found?.nombres);
    this.form.controls['apellidos'].setValue(found?.apellidos);
    this.form.controls['edad'].setValue(found?.edad);
    this.form.controls['ciudad'].setValue(found?.ciudad);
    /*
    this.form.patchValue({
      nombres: found?.nombres,
      apellidos: found?.apellidos,
      edad: found?.edad,
      ciudad: found?.ciudad
    }); 
    */
  }


  nextPage() {
    if (this.form.controls['nombres'].value || this.form.controls['apellidos'].value
        || this.form.controls['edad'].value || this.form.controls['ciudad'].value) {
        //this.ticketService.ticketInformation.personalInformation = this.personalInformation;

        this.personalInformation.dni = this.form.controls['dni'].value;
        this.personalInformation.nombres = this.form.controls['nombres'].value;
        this.personalInformation.apellidos = this.form.controls['apellidos'].value;
        this.personalInformation.edad = this.form.controls['edad'].value;
        this.personalInformation.ciudad = this.form.controls['ciudad'].value;
        sessionStorage.setItem('info', JSON.stringify(this.personalInformation));

        this.router.navigate(['optima/conyuge']);

        return;
    }else{
      alert('Formulario inválido');
    }

    //this.submitted = true;
  }
}
