import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PacienteComponent } from './pacientes/pacientes.component';
import { AgendarCitaComponent } from './pages/agendar-cita/agendar-cita.component'


export const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
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
  }
];


// otras rutas si las tienes
