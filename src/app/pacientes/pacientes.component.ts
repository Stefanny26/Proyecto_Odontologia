import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

interface Paciente {
  _id?: string;
  nombres: string;
  fechaNacimiento: string;
  direccion: string;
  telefono: string;
  correo: string;
}

@Component({
  selector: 'app-paciente',
  standalone: true,
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ]
})
export class PacienteComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  formulario: FormGroup = this.fb.group({
    nombres: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]]
  });

  pacientes: Paciente[] = [];
  columnas: string[] = ['nombres', 'fechaNacimiento', 'telefono', 'correo', 'acciones'];
  editando: boolean = false;
  idEditando: string | null = null;

  private API_URL = 'http://localhost:3000/api/pacientes'; // Actualiza si es necesario

  ngOnInit(): void {
    this.obtenerPacientes();
  }

  obtenerPacientes(): void {
    this.http.get<Paciente[]>(this.API_URL).subscribe(data => this.pacientes = data);
  }

  guardarPaciente(): void {
    const datos = this.formulario.value;

    if (this.editando && this.idEditando) {
      this.http.put(`${this.API_URL}/${this.idEditando}`, datos).subscribe(() => {
        this.obtenerPacientes();
        this.cancelar();
      });
    } else {
      this.http.post(this.API_URL, datos).subscribe(() => {
        this.obtenerPacientes();
        this.formulario.reset();
      });
    }
  }

  editar(p: Paciente): void {
    this.formulario.patchValue(p);
    this.editando = true;
    this.idEditando = p._id ?? null;
  }

  eliminar(id: string): void {
    this.http.delete(`${this.API_URL}/${id}`).subscribe(() => {
      this.obtenerPacientes();
    });
  }

  cancelar(): void {
    this.formulario.reset();
    this.editando = false;
    this.idEditando = null;
  }
}
