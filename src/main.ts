import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { InicioComponent } from './app/pages/inicio/inicio.component';

bootstrapApplication(InicioComponent, {
  providers: [
    provideRouter(routes),
  ],
});
