import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfirmacionService {
  private apiUrl = 'http://localhost:3000/api/confirmacion';

  constructor(private http: HttpClient) {}

  obtenerDatos(protocoloId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${protocoloId}`);
  }
  enviarAlCICUAL(protocoloId: number) {
  return this.http.put(`${this.apiUrl}/enviar/${protocoloId}`, {});
}
}
