import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Odontologo {
  _id?: string;
  nombre: string;            // ✅ Coincide con backend
  especialidad: string;      // ✅ Coincide con backend
  telefono: string;          // ✅ Sin tilde (coincide con backend)
  email: string;             // ✅ Coincide con backend
  fechaNacimiento: string;   // Date en backend, string en frontend
  genero: 'Femenino' | 'Masculino'; // ✅ Coincide con backend
}

@Injectable({
  providedIn: 'root'
})
export class OdontologoService {
  private apiUrl = 'http://localhost:4000/api/odontologos';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getAll(): Observable<Odontologo[]> {
    return this.http.get<Odontologo[]>(this.apiUrl);
  }

  create(odontologo: Odontologo): Observable<Odontologo> {
    return this.http.post<Odontologo>(this.apiUrl, odontologo, this.httpOptions);
  }

  update(id: string, odontologo: Odontologo): Observable<Odontologo> {
    return this.http.put<Odontologo>(`${this.apiUrl}/${id}`, odontologo, this.httpOptions);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Alias para compatibilidad con agendar-cita
  getOdontologos(): Observable<Odontologo[]> {
    return this.getAll();
  }
}
