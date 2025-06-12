import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioProtocoloService {
 constructor(private http: HttpClient, private authService: AuthService) {}

  obtenerInvestigadorActivo() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', token || '');

    return this.http.get('http://localhost:3000/api/usuario-protocolo/investigador', { headers });
  }
}
