import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cita {
  _id?: string;
  fecha: string;
  hora: string;
  paciente: string;
  odontologo: string;
  motivo: string;
  estado: 'Programada' | 'Completada' | 'Cancelada';
  observaciones?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private readonly API_URL = 'http://localhost:4000/api/citas';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.API_URL);
  }

  getCitasPorFecha(fecha: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.API_URL}/fecha/${fecha}`);
  }

  crearCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.API_URL, cita, this.httpOptions);
  }

  actualizarCita(id: string, cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.API_URL}/${id}`, cita, this.httpOptions);
  }

  eliminarCita(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
