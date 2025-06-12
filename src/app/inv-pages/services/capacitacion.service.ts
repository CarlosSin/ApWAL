import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionService {
  private apiUrl = 'http://localhost:3000/api/capacitacion';

  constructor(private http: HttpClient) {}

  guardar(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
  }

  obtenerArchivos(protocoloId: number) {
    return this.http.get(`${this.apiUrl}/${protocoloId}`);
  }
}
