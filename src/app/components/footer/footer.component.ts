import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})




export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  redes = [
    { nombre: 'Facebook', icono: 'fa-brands fa-facebook', url: 'https://www.facebook.com' },
    { nombre: 'Instagram', icono: 'fa-brands fa-instagram', url: 'https://www.instagram.com' },
    { nombre: 'TikTok', icono: 'fa-brands fa-tiktok', url: 'https://www.tiktok.com' },
    { nombre: 'YouTube', icono: 'fa-brands fa-youtube', url: 'https://www.youtube.com' },
    { nombre: 'Tiktok', icono: 'fa-brands fa-tiktok', url: 'https://www.youtube.com' },
    { nombre: 'Linkedin', icono: 'fa-brands fa-linkedin', url: 'https://www.linkedin.com' }
  ];

  whatsappUrl = 'https://wa.me/1234567890'; // Cambia con el número de WhatsApp de la Cámara

}