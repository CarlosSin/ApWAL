import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EutanasiaService {
  private apiUrl = `http://localhost:3000/api/eutanasia`;

  constructor(private http: HttpClient) {}

  // Obtener todos los registros de eutanasia para un protocolo
  obtenerPorProtocolo(protocoloId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${protocoloId}`);
  }

  // Guardar o actualizar múltiples registros de eutanasia
  guardar(data: {
    ID_registro_protocolo: number,
    registros: any[]
  }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
