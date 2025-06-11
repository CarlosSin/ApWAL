import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SaludOcupacionalService {
  private apiUrl = 'http://localhost:3000/api/salud-ocupacional';

  constructor(private http: HttpClient) {}

  obtenerPorProtocolo(protocoloId: number) {
    return this.http.get(`${this.apiUrl}/protocolo/${protocoloId}`);
  }

  guardar(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  actualizar(data: any) {
    return this.http.put(this.apiUrl, data);
  }
}
