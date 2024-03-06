import { Component } from '@angular/core';
import { StepsModule} from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { MenuItem, Message, MessageService} from 'primeng/api';
import { OptimaService } from '../../services/optima.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-optima',
  standalone: true,
  imports: [StepsModule, ToastModule, FormsModule],
  templateUrl: './optima.component.html',
  styleUrl: './optima.component.css',
  providers: [MessageService]
})
export class OptimaComponent {

  items: MenuItem[];
  //subscription: Subscription;
  
  constructor(private messageService: MessageService, private optimaService: OptimaService, private router: Router) {

    this.items = [
    {
        label: 'Datos Personales',
        routerLink: 'personal',
        command: (event: any) => {
          this.activeIndex = 0;
          
      }
    },
    {
        label: 'Conyuge',
        routerLink: 'conyuge',
        command: (event: any) => {
          this.activeIndex = 1;
          this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label});
      }
    },
    {
        label: 'Datos académicos',
        routerLink: 'academico',
        command: (event: any) => {
          this.activeIndex = 2;
      }
    },
    {
        label: 'Confirmacion',
        routerLink: 'confirmacion',
        command: (event: any) => {
          this.activeIndex = 3;
      }
    }
  ];

  //this.subscription = this.optimaService.paymentComplete$.subscribe((personalInformation) =>{
    //this.messageService.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.'});
  //});

  }

  ngOnInit(){
    //this.router.navigate(['personal']);
  }

    activeIndex: number = 0;
    firstName: string = "";
    lastName: string = "";
    address: string = "";
 
    msgs: Message[] = [];
 
    next() {
        this.activeIndex++;
    }
 
    ok() {
        this.activeIndex = 0;
    }
 
    onChange(label: string) {
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: label});
    }
}
