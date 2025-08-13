import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PacienteComponent } from './pacientes/pacientes.component';
import { OdontologosComponent } from './odontologos/odontologos.component';
import { CitaComponent } from './citas/citas.component';
import { AgendarCitaComponent } from './pages/agendar-cita/agendar-cita.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', redirectTo: '', pathMatch: 'full' },
  { path: 'pacientes', component: PacienteComponent },
  { path: 'odontologos', component: OdontologosComponent },
  { path: 'citas', component: CitaComponent },
  { path: 'agendar-cita', component: AgendarCitaComponent },
  { path: '**', redirectTo: '' }
];
