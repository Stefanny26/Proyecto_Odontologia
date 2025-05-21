import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PacienteComponent } from './pacientes/pacientes.component';
import { AgendarCitaComponent } from './pages/agendar-cita/agendar-cita.component'
import { OdontologoComponent } from './odontologos/odontologos.component';

export const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent

  },
  {
    path: 'pacientes',
    component: PacienteComponent
  },
  {
    path: '',
    redirectTo: 'pacientes',
    pathMatch: 'full'
  },
  {
    path: 'agendar',
    component: AgendarCitaComponent
  },{
    path: 'odontologos',
    component: OdontologoComponent
  }
];


// otras rutas si las tienes
