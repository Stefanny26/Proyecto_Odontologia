import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CitaService, Cita } from '../../services/cita.service';
import { PacienteService, Paciente } from '../../services/paciente.service';
import { OdontologoService, Odontologo } from '../../services/odontologo.service';

@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.scss']
})
export class AgendarCitaComponent implements OnInit {
  formularioCita!: FormGroup;
  
  horasDisponibles: string[] = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];
  
  citasAgendadas: string[] = [];
  pacientes: Paciente[] = [];
  odontologos: Odontologo[] = [];
  mensaje = '';
  fechaMinima: string = '';

  constructor(
    private fb: FormBuilder, 
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private odontologoService: OdontologoService
  ) {
    // Establecer fecha mínima como hoy
    const today = new Date();
    this.fechaMinima = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.obtenerPacientes();
    this.obtenerOdontologos();
  }

  inicializarFormulario(): void {
    this.formularioCita = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      paciente: ['', Validators.required],
      odontologo: ['', Validators.required],
      motivo: ['', [Validators.required, Validators.minLength(5)]],
      estado: ['Programada'],
      observaciones: ['']
    });

    // Cuando cambie la fecha, consulta citas ya agendadas y limpia la hora
    this.formularioCita.get('fecha')?.valueChanges.subscribe((fecha: string) => {
      if (fecha) {
        this.obtenerCitasPorFecha(fecha);
        // Limpiar hora seleccionada cuando cambia la fecha
        this.formularioCita.patchValue({ hora: '' });
      } else {
        this.citasAgendadas = [];
      }
    });
  }

  obtenerPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (pacientes) => {
        this.pacientes = pacientes;
        console.log('Pacientes cargados:', pacientes);
      },
      error: (error) => {
        console.error('Error al obtener pacientes:', error);
        this.mensaje = 'Error al cargar pacientes. Verifica que el servidor esté corriendo.';
      }
    });
  }

  obtenerOdontologos(): void {
    this.odontologoService.getAll().subscribe({
      next: (odontologos) => {
        this.odontologos = odontologos;
        console.log('Odontólogos cargados:', odontologos);
      },
      error: (error) => {
        console.error('Error al obtener odontólogos:', error);
        this.mensaje = 'Error al cargar odontólogos. Verifica que el servidor esté corriendo.';
      }
    });
  }

  obtenerCitasPorFecha(fecha: string): void {
    this.citaService.getCitasPorFecha(fecha).subscribe({
      next: (citas: Cita[]) => {
        this.citasAgendadas = citas.map((c: Cita) => c.hora);
        console.log('Horas ocupadas para', fecha, ':', this.citasAgendadas);
      },
      error: (error) => {
        console.error('Error al obtener citas:', error);
        this.citasAgendadas = [];
      }
    });
  }

  seleccionarHora(hora: string): void {
    if (!this.estaOcupado(hora)) {
      this.formularioCita.patchValue({ hora: hora });
      console.log('Hora seleccionada:', hora);
    }
  }

  estaOcupado(hora: string): boolean {
    return this.citasAgendadas.includes(hora);
  }

  estaSeleccionado(hora: string): boolean {
    return this.formularioCita.get('hora')?.value === hora;
  }

  agendarCita(): void {
    console.log('=== AGENDAR CITA ===');
    console.log('Formulario válido:', this.formularioCita.valid);
    console.log('Datos:', this.formularioCita.value);

    if (this.formularioCita.invalid) {
      this.mensaje = 'Error: Por favor, completa todos los campos correctamente.';
      this.marcarCamposComoTocados();
      return;
    }

    const cita: Cita = this.formularioCita.value;

    // Validar si ya está agendada esa hora
    if (this.citasAgendadas.includes(cita.hora)) {
      this.mensaje = 'Error: Ya hay una cita agendada a esa hora. Por favor, selecciona otra hora.';
      return;
    }

    // Validar que la fecha no sea en el pasado
    const fechaSeleccionada = new Date(cita.fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaSeleccionada < hoy) {
      this.mensaje = 'Error: No puedes agendar citas en fechas pasadas.';
      return;
    }

    console.log('Enviando cita:', cita);

    this.citaService.crearCita(cita).subscribe({
      next: (resp: Cita) => {
        console.log('Cita creada:', resp);
        this.mensaje = '¡Cita agendada con éxito! 🎉';
        
        // Limpiar formulario
        this.formularioCita.reset();
        this.formularioCita.patchValue({ estado: 'Programada' });
        
        // Actualizar las horas ocupadas si la fecha sigue seleccionada
        this.citasAgendadas = [];
        
        // Auto-limpiar mensaje después de 5 segundos
        setTimeout(() => {
          this.limpiarMensaje();
        }, 5000);
      },
      error: (error) => {
        console.error('Error al guardar cita:', error);
        
        // Mensaje de error más específico
        if (error.status === 400) {
          this.mensaje = 'Error: Datos inválidos. Verifica la información ingresada.';
        } else if (error.status === 500) {
          this.mensaje = 'Error: Problema en el servidor. Intenta nuevamente.';
        } else {
          this.mensaje = 'Error: No se pudo guardar la cita. Verifica tu conexión.';
        }
      }
    });
  }

  esCampoInvalido(campo: string): boolean {
    const control = this.formularioCita.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  limpiarMensaje(): void {
    this.mensaje = '';
  }

  private marcarCamposComoTocados(): void {
    Object.keys(this.formularioCita.controls).forEach(key => {
      this.formularioCita.get(key)?.markAsTouched();
    });
  }

  // Método útil para obtener información del paciente seleccionado
  getPacienteSeleccionado(): Paciente | null {
    const pacienteId = this.formularioCita.get('paciente')?.value;
    return this.pacientes.find(p => p._id === pacienteId) || null;
  }

  // Método útil para obtener información del odontólogo seleccionado
  getOdontologoSeleccionado(): Odontologo | null {
    const odontologoId = this.formularioCita.get('odontologo')?.value;
    return this.odontologos.find(o => o._id === odontologoId) || null;
  }
}
