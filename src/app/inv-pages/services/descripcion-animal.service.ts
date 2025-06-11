import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DescripcionAnimalService {

  private apiUrl = 'http://localhost:3000/api/descripcion-animal';

  constructor(private http: HttpClient) {}

  guardarDescripcion(payload: any) {
    return this.http.post(`${this.apiUrl}`, payload);
  }

  obtenerPorProtocolo(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  actualizarDescripcion(id: number, payload: any) {
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }

}
