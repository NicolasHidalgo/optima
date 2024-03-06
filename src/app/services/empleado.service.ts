import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../interface/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient){}

  Listar(): Observable<Empleado[]>{
    return this.http.get<Empleado[]>('https://localhost:7151/api/empleado');
  }

  Crear(model: FormData): Observable<number>{
    return this.http.post<number>('https://localhost:7151/api/empleado', model);
  }
}
