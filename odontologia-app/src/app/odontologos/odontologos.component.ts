import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OdontologoService, Odontologo } from '../services/odontologo.service';

@Component({
  standalone: true,
  selector: 'app-odontologos',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './odontologos.component.html',
  styleUrls: ['./odontologos.component.scss']
})
export class OdontologosComponent implements OnInit {
  formulario!: FormGroup;
  odontologos: Odontologo[] = [];
  editandoId: string | null = null;
  mensaje = '';

  especialidades = [
    'Odontología General',
    'Ortodoncia',
    'Endodoncia',
    'Periodoncia',
    'Cirugía Oral',
    'Odontopediatría',
    'Prótesis Dental'
  ];

  constructor(private fb: FormBuilder, private service: OdontologoService) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      especialidad: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
      genero: ['Femenino', Validators.required]
    });

    this.cargarOdontologos();
  }

  cargarOdontologos() {
    this.service.getAll().subscribe({
      next: (data) => {
        this.odontologos = data;
        console.log('Odontólogos cargados:', data);
      },
      error: (error) => {
        console.error('Error al cargar odontólogos:', error);
        this.mensaje = 'Error al cargar odontólogos. Verifica que el servidor esté corriendo.';
      }
    });
  }

  guardar() {
    if (this.formulario.invalid) {
      this.mensaje = 'Por favor, completa todos los campos correctamente.';
      this.marcarCamposComoTocados();
      return;
    }

    const datos: Odontologo = this.formulario.value;
    
    if (this.editandoId) {
      this.service.update(this.editandoId, datos).subscribe({
        next: () => {
          this.mensaje = 'Odontólogo actualizado correctamente.';
          this.editandoId = null;
          this.formulario.reset();
          this.formulario.patchValue({ genero: 'Femenino' });
          this.cargarOdontologos();
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
          this.mensaje = 'Error al actualizar el odontólogo.';
        }
      });
    } else {
      this.service.create(datos).subscribe({
        next: () => {
          this.mensaje = 'Odontólogo agregado correctamente.';
          this.formulario.reset();
          this.formulario.patchValue({ genero: 'Femenino' });
          this.cargarOdontologos();
        },
        error: (error) => {
          console.error('Error al agregar:', error);
          this.mensaje = 'Error al agregar el odontólogo.';
        }
      });
    }
  }

  editar(odontologo: Odontologo) {
    this.formulario.patchValue({
      nombre: odontologo.nombre,
      especialidad: odontologo.especialidad,
      telefono: odontologo.telefono,
      email: odontologo.email,
      fechaNacimiento: odontologo.fechaNacimiento,
      genero: odontologo.genero
    });
    this.editandoId = odontologo._id!;
    this.mensaje = '';
  }

  eliminar(id: string) {
    if (confirm('¿Estás seguro de eliminar este odontólogo?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.mensaje = 'Odontólogo eliminado correctamente.';
          this.cargarOdontologos();
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          this.mensaje = 'Error al eliminar el odontólogo.';
        }
      });
    }
  }

  cancelar() {
    this.formulario.reset();
    this.formulario.patchValue({ genero: 'Femenino' });
    this.editandoId = null;
    this.mensaje = '';
  }

  esCampoInvalido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  private marcarCamposComoTocados(): void {
    Object.keys(this.formulario.controls).forEach(key => {
      this.formulario.get(key)?.markAsTouched();
    });
  }
}
