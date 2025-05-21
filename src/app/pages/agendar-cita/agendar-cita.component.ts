import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Para *ngFor, *ngIf, etc.
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass], // IMPORTANTE
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.scss']
})
export class AgendarCitaComponent implements OnInit {
  formularioCita!: FormGroup;
  horasDisponibles: string[] = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];
  citasAgendadas: string[] = ['09:00', '11:00']; // Simulado

  odontologos = ['Dr. Pérez', 'Dra. Gómez', 'Dr. Torres'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formularioCita = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      paciente: ['', Validators.required],
      odontologo: ['', Validators.required]
    });
  }

  agendarCita() {
    if (this.formularioCita.valid) {
      const cita = this.formularioCita.value;
      console.log('Cita registrada:', cita);
      this.citasAgendadas.push(cita.hora); // Solo simulado
      this.formularioCita.reset();
    }
  }
}
