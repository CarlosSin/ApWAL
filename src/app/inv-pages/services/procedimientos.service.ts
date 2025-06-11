import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcedimientosExperimentalesService {

  private apiUrl = 'http://localhost:3000/api/procedimientos';

  constructor(private http: HttpClient) {}

  // Obtener procedimientos por ID de protocolo
  obtenerPorProtocolo(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear nuevos procedimientos
   guardar(payload: any) {
    return this.http.post(this.apiUrl, payload);
  }

  // Actualizar procedimientos existentes
  actualizar(id: number, payload: any) {
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }
}
