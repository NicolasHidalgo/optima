import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../interface/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent implements OnInit {

  model: Empleado;
  lista: Empleado[] = [];
  empleadoForm: FormGroup;
  formData = new FormData();

  constructor(private empleadoService: EmpleadoService, private fb: FormBuilder){
    this.model = {
      idEmpleado: 0,
      nombre: '',
      telefono: '',
      urlImagen: '',
    }
    this.empleadoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      imagen:  ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.empleadoService.Listar().subscribe(res => this.lista = res);
    console.log(this.lista);
  }
  ngOnDestroy(): void{
    
  }

  onImagePicked(event: any) {
    const _file = event.target.files[0]; // Here we use only the first file (single file)
    //this.empleadoForm.patchValue({ file: _file });
    this.formData.append('file', _file);
  }

  onSubmit(){
    debugger; 
    this.formData.append('IdEmpleado', '0');
    this.formData.append('Nombre', this.empleadoForm.value.nombre);
    this.formData.append('Telefono', this.empleadoForm.value.telefono);
    this.formData.append('URLImagen', '');
    
    this.empleadoService.Crear(this.formData)
      .subscribe({
        next: (response) => {
        console.log('this was successful');
      }
    })

  }
}
