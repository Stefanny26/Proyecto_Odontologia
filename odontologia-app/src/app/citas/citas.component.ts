import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CitaService, Cita } from '../services/cita.service';
import { PacienteService, Paciente } from '../services/paciente.service';
import { OdontologoService, Odontologo } from '../services/odontologo.service';

export interface CitaExtendida extends Cita {
  pacienteInfo?: Paciente;
  odontologoInfo?: Odontologo;
}

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitaComponent implements OnInit {
  citas: CitaExtendida[] = [];
  citasFiltradas: CitaExtendida[] = [];
  pacientes: Paciente[] = [];
  odontologos: Odontologo[] = [];
  
  // Filtros
  filtroFecha = '';
  filtroEstado = '';
  filtroPaciente = '';
  filtroOdontologo = '';
  
  // Paginación
  paginaActual = 1;
  citasPorPagina = 10;
  totalPaginas = 1;
  
  mensaje = '';
  cargando = false;

  // Formulario para editar
  formularioEditar!: FormGroup;
  editandoCita: CitaExtendida | null = null;
  mostrandoModal = false;

  estados = ['Programada', 'Completada', 'Cancelada'];
  
  horasDisponibles = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private odontologoService: OdontologoService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarDatos();
  }

  inicializarFormulario(): void {
    this.formularioEditar = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      paciente: ['', Validators.required],
      odontologo: ['', Validators.required],
      motivo: ['', [Validators.required, Validators.minLength(5)]],
      estado: ['Programada', Validators.required],
      observaciones: ['']
    });
  }

  async cargarDatos(): Promise<void> {
    this.cargando = true;
    try {
      // IMPORTANTE: Cargar pacientes y odontólogos ANTES de las citas
      await this.cargarPacientes();
      await this.cargarOdontologos();
      await this.cargarCitas(); // Las citas se cargan al final para poder hacer el mapeo
    } catch (error) {
      this.mensaje = 'Error al cargar los datos.';
      console.error('Error:', error);
    } finally {
      this.cargando = false;
    }
  }

  cargarCitas(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.citaService.getCitas().subscribe({
        next: (citas: any[]) => {
          console.log('Citas recibidas del backend:', citas);
          
          this.citas = citas.map(cita => {
            console.log('Procesando cita individual:', cita);
            console.log('cita.odontologo:', cita.odontologo);
            console.log('cita.odontólogo:', cita.odontólogo);
            
            // Determinar qué campo usar para odontólogo
            const odontologoData = cita.odontologo || cita.odontólogo;
            const odontologoId = typeof odontologoData === 'object' ? odontologoData._id : odontologoData;
            
            console.log('odontologoData:', odontologoData);
            console.log('odontologoId:', odontologoId);
            
            return {
              _id: cita._id,
              fecha: cita.fecha,
              hora: cita.hora,
              motivo: cita.motivo,
              estado: cita.estado,
              observaciones: cita.observaciones,
              // IDs para filtros y edición
              paciente: typeof cita.paciente === 'object' ? cita.paciente._id : cita.paciente,
              odontologo: odontologoId,
              // Objetos completos para mostrar
              pacienteInfo: typeof cita.paciente === 'object' ? cita.paciente : this.pacientes.find(p => p._id === cita.paciente),
              odontologoInfo: typeof odontologoData === 'object' ? odontologoData : this.odontologos.find(o => o._id === odontologoId)
            };
          });
          
          console.log('Citas procesadas:', this.citas);
          console.log('Odontólogos disponibles:', this.odontologos);
          this.aplicarFiltros();
          resolve();
        },
        error: (error) => {
          console.error('Error al cargar citas:', error);
          this.mensaje = 'Error al cargar las citas.';
          reject(error);
        }
      });
    });
  }

  cargarPacientes(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.pacienteService.getPacientes().subscribe({
        next: (pacientes) => {
          console.log('Pacientes cargados:', pacientes);
          this.pacientes = pacientes;
          resolve();
        },
        error: (error) => {
          console.error('Error al cargar pacientes:', error);
          reject(error);
        }
      });
    });
  }

  cargarOdontologos(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.odontologoService.getAll().subscribe({
        next: (odontologos) => {
          console.log('Odontólogos cargados:', odontologos);
          this.odontologos = odontologos;
          resolve();
        },
        error: (error) => {
          console.error('Error al cargar odontólogos:', error);
          reject(error);
        }
      });
    });
  }

  aplicarFiltros(): void {
    let citasFiltradas = [...this.citas];

    if (this.filtroFecha) {
      citasFiltradas = citasFiltradas.filter(cita => 
        cita.fecha === this.filtroFecha
      );
    }

    if (this.filtroEstado) {
      citasFiltradas = citasFiltradas.filter(cita => 
        cita.estado === this.filtroEstado
      );
    }

    if (this.filtroPaciente) {
      citasFiltradas = citasFiltradas.filter(cita => 
        cita.paciente === this.filtroPaciente
      );
    }

    if (this.filtroOdontologo) {
      citasFiltradas = citasFiltradas.filter(cita => 
        cita.odontologo === this.filtroOdontologo
      );
    }

    citasFiltradas.sort((a, b) => {
      const fechaA = new Date(`${a.fecha} ${a.hora}`);
      const fechaB = new Date(`${b.fecha} ${b.hora}`);
      return fechaB.getTime() - fechaA.getTime();
    });

    this.citasFiltradas = citasFiltradas;
    this.calcularPaginacion();
  }

  calcularPaginacion(): void {
    this.totalPaginas = Math.ceil(this.citasFiltradas.length / this.citasPorPagina);
    if (this.paginaActual > this.totalPaginas) {
      this.paginaActual = 1;
    }
  }

  get citasPaginadas(): CitaExtendida[] {
    const inicio = (this.paginaActual - 1) * this.citasPorPagina;
    const fin = inicio + this.citasPorPagina;
    return this.citasFiltradas.slice(inicio, fin);
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  limpiarFiltros(): void {
    this.filtroFecha = '';
    this.filtroEstado = '';
    this.filtroPaciente = '';
    this.filtroOdontologo = '';
    this.paginaActual = 1;
    this.aplicarFiltros();
  }

  abrirModalEditar(cita: CitaExtendida): void {
    this.editandoCita = cita;
    this.formularioEditar.patchValue({
      fecha: cita.fecha,
      hora: cita.hora,
      paciente: cita.paciente,
      odontologo: cita.odontologo,
      motivo: cita.motivo,
      estado: cita.estado,
      observaciones: cita.observaciones || ''
    });
    this.mostrandoModal = true;
  }

  cerrarModal(): void {
    this.mostrandoModal = false;
    this.editandoCita = null;
    this.formularioEditar.reset();
  }

  guardarCambios(): void {
    if (this.formularioEditar.invalid || !this.editandoCita) {
      this.mensaje = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    const datosActualizados: Cita = this.formularioEditar.value;

    this.citaService.actualizarCita(this.editandoCita._id!, datosActualizados).subscribe({
      next: () => {
        this.mensaje = 'Cita actualizada correctamente.';
        this.cerrarModal();
        this.cargarDatos();
        setTimeout(() => this.mensaje = '', 3000);
      },
      error: (error) => {
        console.error('Error al actualizar cita:', error);
        this.mensaje = 'Error al actualizar la cita.';
      }
    });
  }

  eliminarCita(cita: CitaExtendida): void {
    const confirmar = confirm(
      `¿Estás seguro de eliminar la cita de ${cita.pacienteInfo?.nombres || 'Paciente'} ` +
      `del ${this.formatearFecha(cita.fecha)} a las ${cita.hora}?`
    );

    if (confirmar && cita._id) {
      this.citaService.eliminarCita(cita._id).subscribe({
        next: () => {
          this.mensaje = 'Cita eliminada correctamente.';
          this.cargarDatos();
          setTimeout(() => this.mensaje = '', 3000);
        },
        error: (error) => {
          console.error('Error al eliminar cita:', error);
          this.mensaje = 'Error al eliminar la cita.';
        }
      });
    }
  }

  cambiarEstadoCita(cita: CitaExtendida, nuevoEstado: string): void {
    const datosActualizados: Cita = {
      fecha: cita.fecha,
      hora: cita.hora,
      paciente: cita.paciente,
      odontologo: cita.odontologo,
      motivo: cita.motivo,
      estado: nuevoEstado as any,
      observaciones: cita.observaciones
    };

    this.citaService.actualizarCita(cita._id!, datosActualizados).subscribe({
      next: () => {
        this.mensaje = `Estado cambiado a "${nuevoEstado}" correctamente.`;
        this.cargarDatos();
        setTimeout(() => this.mensaje = '', 3000);
      },
      error: (error) => {
        console.error('Error al cambiar estado:', error);
        this.mensaje = 'Error al cambiar el estado de la cita.';
      }
    });
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Programada': return 'badge bg-primary';
      case 'Completada': return 'badge bg-success';
      case 'Cancelada': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES');
  }

  esCitaPasada(cita: CitaExtendida): boolean {
    const fechaCita = new Date(`${cita.fecha} ${cita.hora}`);
    return fechaCita < new Date();
  }

  esCitaHoy(cita: CitaExtendida): boolean {
    const hoy = new Date().toISOString().split('T')[0];
    return cita.fecha === hoy;
  }

  get estadisticas() {
    const total = this.citas.length;
    const programadas = this.citas.filter(c => c.estado === 'Programada').length;
    const completadas = this.citas.filter(c => c.estado === 'Completada').length;
    const canceladas = this.citas.filter(c => c.estado === 'Cancelada').length;
    const hoy = this.citas.filter(c => this.esCitaHoy(c)).length;

    return { total, programadas, completadas, canceladas, hoy };
  }

  trackByCita(index: number, cita: CitaExtendida): any {
    return cita._id;
  }

  getPaginasArray(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }
}
