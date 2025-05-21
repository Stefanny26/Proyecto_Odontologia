import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

interface Odontologo {
  id: number;
  nombre: string;
  especialidad: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  genero: 'Femenino' | 'Masculino';
}

@Component({
  selector: 'app-odontologo',
  standalone: true,
  templateUrl: './odontologos.component.html',
  styleUrls: ['./odontologos.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
  ]
})
export class OdontologoComponent implements OnInit {
  private fb = inject(FormBuilder);

  formulario: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    especialidad: ['', Validators.required],
    telefono: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    fechaNacimiento: ['', Validators.required],
    genero: ['', Validators.required]
  });

  odontologos: Odontologo[] = [];
  columnas: string[] = ['nombre', 'especialidad', 'telefono', 'email', 'fechaNacimiento', 'genero', 'acciones'];
  editando: boolean = false;
  idEditando: number | null = null;

  private idCounter = 1; // Para IDs únicos en memoria

  ngOnInit(): void {
    // Puedes poner datos iniciales si quieres:
    this.odontologos = [
      {
        id: this.idCounter++,
        nombre: 'Ana Gómez',
        especialidad: 'Ortodoncia',
        telefono: '0991234567',
        email: 'ana@example.com',
        fechaNacimiento: '1985-10-15',
        genero: 'Femenino'
      }
    ];
  }

  guardarOdontologo(): void {
    if (this.formulario.invalid) return;

    const datos = this.formulario.value;

    if (this.editando && this.idEditando !== null) {
      // Actualizar
      const index = this.odontologos.findIndex(o => o.id === this.idEditando);
      if (index !== -1) {
        this.odontologos[index] = { id: this.idEditando, ...datos };
      }
      this.cancelar();
    } else {
      // Crear nuevo
      this.odontologos.push({ id: this.idCounter++, ...datos });
      this.formulario.reset();
    }
  }

  editar(o: Odontologo): void {
    this.formulario.patchValue(o);
    this.editando = true;
    this.idEditando = o.id;
  }

  eliminar(id: number): void {
    this.odontologos = this.odontologos.filter(o => o.id !== id);
    if (this.editando && this.idEditando === id) {
      this.cancelar();
    }
  }

  cancelar(): void {
    this.formulario.reset();
    this.editando = false;
    this.idEditando = null;
  }
}
