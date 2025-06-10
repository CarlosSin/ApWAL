import { HttpClient } from '@angular/common/http';
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
}
