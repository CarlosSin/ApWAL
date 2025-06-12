import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProtocoloService } from '../../../services/protocolo.service';

@Component({
  selector: 'app-recomendation-protocols',
  imports: [CommonModule],
  templateUrl: './recomendation-protocols.component.html',
})
export class RecomendationProtocolsComponent {
 private protocoloService = inject(ProtocoloService);
    protocolos: any[] = [];

  ngOnInit() {
    this.protocoloService.getProtocolosConRecomendacionesAprobadosDelUsuario().subscribe({
    next: (data: any[]) => {
      this.protocolos = data;
    },
    error: (err) => {
      console.error('Error al cargar protocolos aprobados con recomendaciones:', err);
    }
  });
  }

}
