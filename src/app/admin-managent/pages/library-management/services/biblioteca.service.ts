import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recurso {
  ID_recurso: number;
  nombre: string;
  descripcion: string;
  ID_tipo: number;
  ruta: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  tipo?: string; // nombre del tipo, si lo necesitas
}

export interface TipoRecurso {
  ID_tipo_recurso: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class BibliotecaService {
  private baseUrl = 'http://localhost:3000/api/biblioteca'; //

  constructor(private http: HttpClient) {}

  obtenerRecursos(): Observable<Recurso[]> {
    return this.http.get<Recurso[]>(`${this.baseUrl}/recursos`);
  }

  agregarRecurso(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/recursos`, formData);
  }

  eliminarRecurso(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/recursos/${id}`);
  }

  obtenerTipos(): Observable<TipoRecurso[]> {
    return this.http.get<TipoRecurso[]>(`${this.baseUrl}/tipos`);
  }
}
