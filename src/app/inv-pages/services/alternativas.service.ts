import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlternativasService {

  private apiUrl = `http://localhost:3000/api/alternativas`;

  constructor(private http: HttpClient) {}

  // Obtener alternativas por protocolo
  obtenerPorProtocolo(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Guardar o actualizar alternativas
  guardar(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Actualizar (si decides usar PUT en algún momento)
  actualizar(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
