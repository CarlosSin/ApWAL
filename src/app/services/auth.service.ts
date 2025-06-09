import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  login(usuario: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/auth/login', {
      usuario,
      password,
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getPayload(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try { //Identificacion del token JWT
      const payloadBase64 = token.split('.')[1];
      const decoded = atob(payloadBase64);
      return JSON.parse(decoded);
    } catch (e) {
      console.error('Error al decodificar token:', e);
      return null;
    }
  }

  getRoles(): string[] {
    const payload = this.getPayload();
    return Array.isArray(payload?.roles) ? payload.roles : [];
  }

  setActiveRole(role: string): void {
    localStorage.setItem('rolActivo', role);
  }

  getActiveRole(): string | null {
    return localStorage.getItem('rolActivo');
  }

  hasMultipleRoles(): boolean {
    return this.getRoles().length > 1;
  }


}
