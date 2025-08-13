import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PacienteService, Paciente } from '../services/paciente.service';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacienteComponent implements OnInit {
  formulario: FormGroup;
  pacientes: Paciente[] = [];
  editando = false;
  idEditando: string | null = null;
  mensaje = '';

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService
  ) {
    this.formulario = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.obtenerPacientes();
  }

  obtenerPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (pacientes) => {
        this.pacientes = pacientes;
        console.log('Pacientes obtenidos:', pacientes);
      },
      error: (error) => {
        console.error('Error al obtener pacientes:', error);
        this.mensaje = 'Error al cargar pacientes. Verifica que el servidor esté corriendo.';
      }
    });
  }

  pruebaBoton(): void {
    console.log('¡Botón de prueba funcionando!');
    console.log('Datos del formulario:', this.formulario.value);
    console.log('Formulario válido:', this.formulario.valid);
    this.mensaje = 'Botón de prueba funcionando correctamente';
  }

  guardarPaciente(): void {
    console.log('=== MÉTODO GUARDAR PACIENTE ===');
    console.log('Formulario válido:', this.formulario.valid);
    console.log('Datos del formulario:', this.formulario.value);
    
    if (this.formulario.invalid) {
      console.log('Formulario inválido');
      this.mensaje = 'Por favor, completa todos los campos correctamente.';
      this.marcarCamposComoTocados();
      return;
    }

    const datos: Paciente = this.formulario.value;
    console.log('Datos a enviar al backend:', datos);
    
    if (this.editando && this.idEditando) {
      console.log('Actualizando paciente con ID:', this.idEditando);
      this.pacienteService.actualizarPaciente(this.idEditando, datos).subscribe({
        next: (resp) => {
          console.log('Paciente actualizado:', resp);
          this.mensaje = 'Paciente actualizado correctamente.';
          this.obtenerPacientes();
          this.cancelar();
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
          this.mensaje = 'Error al actualizar el paciente.';
        }
      });
    } else {
      console.log('Creando nuevo paciente...');
      this.pacienteService.agregarPaciente(datos).subscribe({
        next: (resp) => {
          console.log('Paciente agregado:', resp);
          this.mensaje = 'Paciente agregado correctamente.';
          this.obtenerPacientes();
          this.formulario.reset();
        },
        error: (error) => {
          console.error('Error al agregar:', error);
          this.mensaje = 'Error al agregar el paciente.';
        }
      });
    }
  }

  editar(paciente: Paciente): void {
    this.formulario.patchValue(paciente);
    this.editando = true;
    this.idEditando = paciente._id!;
  }

  eliminar(id: string): void {
    if (confirm('¿Estás seguro de eliminar este paciente?')) {
      this.pacienteService.eliminarPaciente(id).subscribe({
        next: () => {
          this.mensaje = 'Paciente eliminado correctamente.';
          this.obtenerPacientes();
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          this.mensaje = 'Error al eliminar el paciente.';
        }
      });
    }
  }

  cancelar(): void {
    this.formulario.reset();
    this.editando = false;
    this.idEditando = null;
    this.mensaje = '';
  }

  private marcarCamposComoTocados(): void {
    Object.keys(this.formulario.controls).forEach(key => {
      this.formulario.get(key)?.markAsTouched();
    });
  }

  esCampoInvalido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}
