import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Importa RouterModule

@Component({
  standalone: true,
  selector: 'app-inicio',
  imports: [RouterModule,CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  servicios = [
    {
      icono: 'bi bi-shield-check', // usa Bootstrap Icons si lo deseas
      titulo: 'Cuidado Preventivo',
      descripcion: 'Exámenes, limpiezas y educación sobre salud bucal.'
    },
    {
      icono: 'bi bi-emoji-smile',
      titulo: 'Odontología Restaurativa',
      descripcion: 'Empastes, coronas y tratamientos para restaurar tu sonrisa.'
    },
    {
      icono: 'bi bi-heart-pulse',
      titulo: 'Periodoncia',
      descripcion: 'Tratamientos de encías para mantener tu boca sana.'
    },
    {
      icono: 'bi bi-braces',
      titulo: 'Ortodoncia',
      descripcion: 'Brackets y alineadores para una sonrisa perfecta.'
    }
  ];

}
