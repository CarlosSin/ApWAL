import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {
  private apiUrl = 'http://localhost:3000/api/clasificacion';

  constructor(private http: HttpClient) {}

  // Obtener clasificación por protocolo
  obtenerPorProtocolo(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Guardar o actualizar clasificación
  guardar(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
