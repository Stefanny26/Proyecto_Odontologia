import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  
  redes = [
    { nombre: 'Facebook', icono: 'fab fa-facebook-f', url: 'https://www.facebook.com', color: '#3b5998' },
    { nombre: 'Instagram', icono: 'fab fa-instagram', url: 'https://www.instagram.com', color: '#e4405f' },
    { nombre: 'TikTok', icono: 'fab fa-tiktok', url: 'https://www.tiktok.com', color: '#000000' },
    { nombre: 'YouTube', icono: 'fab fa-youtube', url: 'https://www.youtube.com', color: '#ff0000' },
    { nombre: 'LinkedIn', icono: 'fab fa-linkedin-in', url: 'https://www.linkedin.com', color: '#0077b5' },
    { nombre: 'X', icono: 'fab fa-x-twitter', url: 'https://www.twitter.com', color: '#1da1f2' }
  ];

  whatsappUrl = 'https://wa.me/593999999999';

  servicios = [
    'Asesoría dental personalizada',
    'Gestión de proyectos odontológicos', 
    'Crecimiento y cuidado de tu salud oral',
    'Capacitación en higiene y prevención',
    'Inversiones en tecnología dental'
  ];

  contacto = {
    direccion: 'Av. Odontología #123, Sto Dgo, Ecuador',
    telefono: '+593 99 999 9999',
    email: 'contacto@clinicadental.com',
    horario: 'Lun - Vie: 8:00 AM - 5:00 PM'
  };

  getAngularVersion(): string {
    return '17+';
  }
}