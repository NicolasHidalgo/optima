import { Component } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { OptimaService } from '../../../services/optima.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext'
import { InputNumberModule} from 'primeng/inputnumber';
import { IOptima } from '../../../interface/IOptima';

@Component({
  selector: 'app-academico',
  standalone: true,
  imports: [AutoCompleteModule, ButtonModule, FormsModule, ReactiveFormsModule
    , CardModule, CommonModule, DropdownModule, InputTextModule, InputNumberModule],
  templateUrl: './academico.component.html',
  styleUrl: './academico.component.css'
})
export class AcademicoComponent {

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

  universidades: any[] = [];
  filteredUniversidades: any[] = [];
  selectedUniversidades: any[] = [];
  centroLabores: any[] = [];

  submitted: boolean = false;
  form: FormGroup;
  constructor(public optimaService: OptimaService, private router: Router, private formBuilder: FormBuilder) { 

    this.form = this.formBuilder.group({
      selectedUniversidad: ['', Validators.required],
      selectedTrabajo: ['', Validators.required],
      salario: ['', Validators.required],
      carrera: ['', Validators.required],
      experiencia: ['', Validators.required],
    });
    this.centroLabores = [
      {nombre: 'Banco Ripley', code: 'BR'},
      {nombre: 'Saga Falabella', code: 'SF'},
      {nombre: 'Banco de Crédito del Perú', code: 'BCP'},
      {nombre: 'Telefónica', code: 'TFN'},
      {nombre: 'Optima', code: 'OP'},
      {nombre: 'Backus', code: 'BAK'}
  ];
    this.submitted = false;
  }

  ngOnInit() { 
    this.optimaService.getUniversidad().subscribe(res => this.universidades = res.data);

    if (typeof(Storage) !== 'undefined') {
      // Código cuando Storage es compatible
      const _info = sessionStorage.getItem('info');
      this.info = JSON.parse(_info || '{}') as IOptima;
    } else {
     // Código cuando Storage NO es compatible
    }
  }

  filterUniversidad(event: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.universidades.length; i++) {
      let uni = this.universidades[i];
      if (uni.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(uni);
      }
    }

    this.filteredUniversidades = filtered;
  }

  prevPage() {
    this.router.navigate(['optima/conyuge']);
  }

  nextPage() {
    if (this.form.controls['selectedUniversidad'].value || this.form.controls['selectedTrabajo'].value
        || this.form.controls['salario'].value || this.form.controls['carrera'].value || this.form.controls['experiencia'].value) {
        
        this.info.universidad = this.form.controls['selectedUniversidad'].value.nombre;
        this.info.trabajo = this.form.controls['selectedTrabajo'].value.nombre;
        this.info.salario = this.form.controls['salario'].value;
        this.info.carrera = this.form.controls['carrera'].value;
        this.info.experiencia = this.form.controls['experiencia'].value;
        sessionStorage.setItem('info', JSON.stringify(this.info));
        this.router.navigate(['optima/confirmacion']);

        return;
    }else{
      alert('Formulario inválido');
    }

    //this.submitted = true;
  }
}
