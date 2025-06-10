import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DatosGeneralesService {
  private apiUrl = 'http://localhost:3000/api/datos-generales';

  constructor(private http: HttpClient) {}

  obtenerPorProtocolo(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  guardar(datos: any) {
    return this.http.post(this.apiUrl, datos);
  }

  actualizar(id: number, datos: any) {
    return this.http.put(`${this.apiUrl}/${id}`, datos);
  }
}
