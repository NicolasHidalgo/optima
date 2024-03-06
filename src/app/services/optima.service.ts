import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOptima } from '../interface/IOptima';

@Injectable({
  providedIn: 'root'
})
export class OptimaService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any>{
    return this.http.get<any>('assets/data.json');
  }

  getUniversidad(): Observable<any>{
    return this.http.get<any>('assets/universidad.json');
  }

  guardar(model :IOptima): Observable<any>{
    return this.http.post<any>('https://optima.com/api/guardar', model);
  }
}
