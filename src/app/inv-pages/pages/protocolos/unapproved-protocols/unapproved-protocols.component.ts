import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProtocoloService } from '../../../services/protocolo.service';

@Component({
  selector: 'app-unapproved-protocols',
  imports: [CommonModule],
  templateUrl: './unapproved-protocols.component.html',
})
export class UnapprovedProtocolsComponent {

    private protocoloService = inject(ProtocoloService);
    protocolos: any[] = [];

  ngOnInit() {
    this.protocoloService.getProtocolosNoAprobadosDelUsuario().subscribe({
    next: (data: any[]) => {
      this.protocolos = data;
    },
    error: (err) => {
      console.error('Error al cargar protocolos no aprobados:', err);
    }
  });
  }

 }
