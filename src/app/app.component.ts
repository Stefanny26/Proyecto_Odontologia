import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component'; // <-- Importa el footer

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // (nota: plural styleUrls)
  standalone: true,  // (si usas standalone components es obligatorio ponerlo)
  imports: [
    RouterOutlet, 
    NavbarComponent, 
    FooterComponent,
  ]
})
export class AppComponent {
  title = 'odontologia-app';
}
