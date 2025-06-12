import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SaludOcupacionalService {
  private apiUrl = 'http://localhost:3000/api/salud-ocupacional';

  constructor(private http: HttpClient) {}

  /**
   * Obtener los datos generales y por animal asociados a un protocolo
   */
  obtenerPorProtocolo(protocoloId: number) {
    return this.http.get(`${this.apiUrl}/protocolo/${protocoloId}`);
  }

  /**
   * Guardar o actualizar datos generales y por animal
   */
  guardarTodo(payload: {
    ID_registro_protocolo: number,
    nivel_bioseguridad: string,
    equipos: string,
    procedimientos: string,
    datosAnimales: any[]
  }) {
    return this.http.post(this.apiUrl, payload);
  }
}
