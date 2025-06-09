import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface usuarioRules {
  no_decontrol_usuario: number;
  nombre_pila:string;
  primer_apellido:string;
  segunda_apellido:string;
  telefono: number;
  extension: number;
  fecha_registro: string;
  grado_estudio: string;
  correo_electronico:string;
  nombre_usuario:string;  
  password:string;
  estado_usuario:boolean;
  ID_departamento_usuario: number;
  rol:number;
  puede_iniciarsecion:boolean;
}

@Injectable({
  providedIn: 'root'  // ✅ Esto registra el servicio automáticamente
})
export class UsuariosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/usuarios';

  getUsuarios(): Observable<usuarioRules[]> {
    return this.http.get<usuarioRules[]>(this.apiUrl);
  }

  crearUsuarioback(usuario: usuarioRules): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }
}