import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  servicios = [
    {
      titulo: 'Gestión de Pacientes',
      descripcion: 'Administra la información completa de tus pacientes de forma eficiente y segura.',
      icono: 'fas fa-users text-primary'
    },
    {
      titulo: 'Control de Odontólogos',
      descripcion: 'Maneja el registro y especialidades de todo tu equipo médico profesional.',
      icono: 'fas fa-user-md text-success'
    },
    {
      titulo: 'Agenda de Citas',
      descripcion: 'Sistema completo para agendar, modificar y controlar todas las citas médicas.',
      icono: 'fas fa-calendar-alt text-info'
    },
    {
      titulo: 'Reportes y Estadísticas',
      descripcion: 'Genera reportes detallados y obtén estadísticas importantes de tu clínica.',
      icono: 'fas fa-chart-bar text-warning'
    }
  ];

  accesosRapidos = [
    {
      titulo: 'Agendar Nueva Cita',
      descripcion: 'Programa una cita rápidamente',
      ruta: '/agendar-cita',
      icono: 'fas fa-calendar-plus',
      color: 'btn-primary'
    },
    {
      titulo: 'Ver Todas las Citas',
      descripcion: 'Consulta el calendario completo',
      ruta: '/citas',
      icono: 'fas fa-list',
      color: 'btn-success'
    },
    {
      titulo: 'Registrar Paciente',
      descripcion: 'Agrega un nuevo paciente',
      ruta: '/pacientes',
      icono: 'fas fa-user-plus',
      color: 'btn-info'
    },
    {
      titulo: 'Gestionar Odontólogos',
      descripcion: 'Administra tu equipo médico',
      ruta: '/odontologos',
      icono: 'fas fa-user-md',
      color: 'btn-warning'
    }
  ];
}
