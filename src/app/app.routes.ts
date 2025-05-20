import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PacienteComponent } from './pacientes/pacientes.component';

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
  }
  // otras rutas si las tienes
];
