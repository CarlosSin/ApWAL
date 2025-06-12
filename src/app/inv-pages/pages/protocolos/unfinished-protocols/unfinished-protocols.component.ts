import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProtocoloService } from '../../../services/protocolo.service';

@Component({
  selector: 'app-unfinished-protocols',
  imports: [CommonModule],
  templateUrl: './unfinished-protocols.component.html',
})
export class UnfinishedProtocolsComponent {
      private protocoloService = inject(ProtocoloService);
    protocolos: any[] = [];

  ngOnInit() {
    this.protocoloService.getProtocolosEnProcesoDelUsuario().subscribe({
    next: (data: any[]) => {
      this.protocolos = data;
    },
    error: (err) => {
      console.error('Error al cargar protocolos aprobados:', err);
    }
  });
  }

 }
