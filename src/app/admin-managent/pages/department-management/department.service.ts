import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface departamentorules{
  ID_departamento:number,
  nombre_departamento:string,
  disponibilidad_departamento:boolean,
}


@Injectable({
  providedIn: 'root'  // ✅ Esto registra el servicio automáticamente
})

export class DepartamentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/deptos';

  getUsuarios(): Observable<departamentorules[]> {
    return this.http.get<departamentorules[]>(this.apiUrl);
  }

  /*
  crearUsuarioback(usuario: usuarioRules): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }*/
}