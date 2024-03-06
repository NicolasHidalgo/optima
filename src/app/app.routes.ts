import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmpleadoComponent } from './core/empleado/empleado.component';
import { OptimaComponent } from './core/optima/optima.component';
import { PersonalComponent } from './core/optima/personal/personal.component';
import { ConyugeComponent } from './core/optima/conyuge/conyuge.component';
import { AcademicoComponent } from './core/optima/academico/academico.component';
import { ConfirmacionComponent } from './core/optima/confirmacion/confirmacion.component';

export const routes: Routes = [
    //{path: '', component: AppComponent, pathMatch: 'full'},
    {
        path: 'empleado',
        component: EmpleadoComponent,
    },
    {
        path: 'optima',
        component: OptimaComponent,
        children: [
            { path: '', redirectTo: 'personal', pathMatch: 'full' },
            { path: 'personal', component:  PersonalComponent },
            { path: 'conyuge', component:  ConyugeComponent },
            { path: 'academico', component:  AcademicoComponent },
            { path: 'confirmacion', component:  ConfirmacionComponent },
        ],
    },
];
