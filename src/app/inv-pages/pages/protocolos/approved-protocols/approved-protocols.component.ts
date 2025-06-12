import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProtocoloService } from '../../../services/protocolo.service';

@Component({
  selector: 'app-approved-protocols',
  imports: [CommonModule],
  templateUrl: './approved-protocols.component.html',
})
export class ApprovedProtocolsComponent {

    private protocoloService = inject(ProtocoloService);
    protocolos: any[] = [];

  ngOnInit() {
    this.protocoloService.getProtocolosAprobadosDelUsuario().subscribe({
    next: (data: any[]) => {
      this.protocolos = data;
    },
    error: (err) => {
      console.error('Error al cargar protocolos aprobados:', err);
    }
  });
  }
 }
