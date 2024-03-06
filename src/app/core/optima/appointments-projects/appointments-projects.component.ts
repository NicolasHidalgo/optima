import { APP_ID, Component, inject } from '@angular/core';
import { AppointmentsService } from '../../../services/appointments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointments } from '../../../interface/Appointments';
import moment from "moment"
import { AppointmentsResponse } from '../../../interface/appointments-response';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments-projects.component.html',
  styleUrl: './appointments-projects.component.css',
  providers: [ConfirmationService, MessageService]
})
export class AppointmentsProjectsComponent {

  private appointmentService = inject(AppointmentsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  appointments: AppointmentsResponse[] = [];
  loading: boolean = false;
  idProject: number = 0;
  filterFrom!: Date;
  filterTo!: Date;
  

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
    this.idProject = params['id'];
    })
    this.filterFrom = moment().clone().startOf('month').toDate();
    this.filterTo = moment().toDate();
    this.loadAppointmentsByRangeRegister();
  }

  getAppointmentsByProjectRegister(idProyecto: number, fechainic: string, fechafin: string): void {
    this.loading = true;
    setTimeout(() => {
    this.appointmentService.getAppointmentsByProjectRegister(idProyecto, fechainic, fechafin).subscribe((appointments) => {
    this.appointments = appointments
    console.log(this.appointments);
    this.loading = false;
    })
    }, 1000);
  }

  onFromChange(event: Date): void {
    this.filterFrom = event;
  }

  onToChange(event: Date): void {
    this.filterTo = event;
  }
  loadAppointmentsByRangeRegister(): void {
    this.getAppointmentsByProjectRegister(this.idProject, moment(this.filterFrom).format('YYYY-MM-DD'), moment(this.filterTo).format('YYYY-MM-DD'));
  }
  filersApply(): void {
    // this.getLeadsByStatus(this.idGerencia, this.selectedStatus);
    this.loadAppointmentsByRangeRegister();
  }

  deleteAppointment(appointment: AppointmentsResponse): void {
    this.appointmentService.deleteAppointment(appointment.id);
  }

  getMenuItems(appointment: any): MenuItem[] {
    return [
    {
    label: 'Ver',
    icon: 'pi pi-eye',
    command: () => {
    this.router.navigateByUrl(`/citas/citas-consulta-cliente-detalle/${appointment.idCita}`);
    },
    },
    {
    label:'Editar',
    icon: 'pi pi-check-circle',
    command: () => {
    this.router.navigateByUrl(`/citas/citas-editar/${appointment.proyecto.idProyecto}/${appointment.idCita}`);
    },
    },
    {
    label: 'Eliminar',
    icon: 'pi pi-trash',
    command: () => {
    this.deleteAppointment(appointment);
    },
    },
    ]
    }
}
