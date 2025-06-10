import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Investigador {
  noControl: number;
  nombre: string;
  email: string;
  departamento: string;
  telefono: number;
  extension: number;
}


@Injectable({
  providedIn: 'root'
})
export class DatosPersonalesService {
    private apiUrl = 'http://localhost:3000/api/datos-personales'; // Ajusta la URL a tu API real

    constructor(private http: HttpClient) {}

    obtenerPorNumeroControl(noControl: string): Observable<Investigador> {
    return this.http.get<Investigador>(`${this.apiUrl}/${noControl}`);
  }

}
