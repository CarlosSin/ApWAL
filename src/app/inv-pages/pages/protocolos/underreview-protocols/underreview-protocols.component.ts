import { Component, OnInit, inject } from '@angular/core';
import { ProtocoloService } from '../../../services/protocolo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-underreview-protocols',
  templateUrl: './underreview-protocols.component.html',
  imports: [CommonModule]
})
export class UnderreviewProtocolsComponent implements OnInit {
  private protocoloService = inject(ProtocoloService);
  protocolos: any[] = [];

  ngOnInit() {
    this.protocoloService.getProtocolosRevisionDelUsuario().subscribe({
    next: (data: any[]) => {
      this.protocolos = data;
    },
    error: (err) => {
      console.error('Error al cargar protocolos en revisión:', err);
    }
  });
  }
}
