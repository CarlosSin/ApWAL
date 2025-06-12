import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProtocoloService {

 private apiUrl = 'http://localhost:3000/api/protocolo';

  constructor(private http: HttpClient) {}

  guardarProtocolo(noInv: number, noSupl: number) {
    return this.http.post(this.apiUrl, {
      no_decontrol_investigador: noInv,
      no_decontrol_suplente: noSupl
    });
  }

  actualizarProtocolo(id: number, noInv: number, noSupl: number) {
    return this.http.put(`${this.apiUrl}/${id}`, {
      no_decontrol_investigador: noInv,
      no_decontrol_suplente: noSupl
    });
  }

  getProtocolosRevisionDelUsuario() {
    const token = localStorage.getItem('token'); // o donde tengas guardado el token
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(`${this.apiUrl}/revision-del-usuario`, { headers });
}

  getProtocolosAprobadosDelUsuario() {
    const token = localStorage.getItem('token'); // o donde tengas guardado el token
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(`${this.apiUrl}/aprobados-del-usuario`, { headers });
}
  getProtocolosNoAprobadosDelUsuario() {
    const token = localStorage.getItem('token'); // o donde tengas guardado el token
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(`${this.apiUrl}/no-aprobados-del-usuario`, { headers });
}

 getProtocolosEnProcesoDelUsuario() {
    const token = localStorage.getItem('token'); // o donde tengas guardado el token
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(`${this.apiUrl}/en-proceso-del-usuario`, { headers });
}


 getProtocolosConRecomendacionesAprobadosDelUsuario() {
    const token = localStorage.getItem('token'); // o donde tengas guardado el token
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(`${this.apiUrl}/aprobados-recomendaciones-del-usuario`, { headers });
}

cambiarEstadoProtocolo(id: number, nuevoEstado: string) {
  return this.http.put(`${this.apiUrl}/cambiar-estado/${id}`, { nuevoEstado });
}
obtenerTodos() {
  return this.http.get<any[]>(`${this.apiUrl}/todos`);
}

}
