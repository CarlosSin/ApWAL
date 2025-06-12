import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgenteAtaService {
private apiUrl = 'http://localhost:3000/api/agente-ata';

  constructor(private http: HttpClient) {}

  // Obtener todos los agentes ATA del protocolo
  obtenerPorProtocolo(protocoloId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${protocoloId}`);
  }

  // Obtener un agente ATA específico por protocolo y animal
  obtenerPorAnimal(protocoloId: number, animalId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${protocoloId}/${animalId}`);
  }

  // Guardar o actualizar la información de un agente ATA
  guardar(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
