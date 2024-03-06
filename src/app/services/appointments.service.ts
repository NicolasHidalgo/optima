import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  getAppointmentsByProjectRegister(idProyecto: any, fechainic: any, fechafin: any): Observable<any>{
    return this.http.get<any>('https://optima/api/apointments');
  }

  deleteAppointment(idAppointment: any){
    return this.http.delete<any>('https://optima/api/apointments/delete/' + idAppointment);
  }


}
