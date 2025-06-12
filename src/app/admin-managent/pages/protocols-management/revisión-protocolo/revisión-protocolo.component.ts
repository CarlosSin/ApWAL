import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProtocoloService } from '../../../../inv-pages/services/protocolo.service';

interface protocolrule{
  ID_protocolo:string,
  nombre_protocolo:string,
  edo_protocolo:string,
  fecha:string,
}


@Component({
  selector: 'app-revisión-protocolo',
  imports: [CommonModule, FormsModule],
  templateUrl: './revisión-protocolo.component.html',
})
export class RevisiónProtocoloComponent {

 private protocoloService = inject(ProtocoloService);
  lista_protocolo_revicion: any[] = [];
  lista_resto_protocolos: any[] = [];

  ngOnInit() {
    this.cargarProtocolos();
  }

  cargarProtocolos() {
    // Aquí deberías traer todos los protocolos
    this.protocoloService.obtenerTodos().subscribe((protocolos: any[]) => {
      this.lista_protocolo_revicion = protocolos.filter(p => p.estado_protocolo === 'R');
      this.lista_resto_protocolos = protocolos.filter(p => p.estado_protocolo !== 'R');
    });
  }

  cambiarEstado(id: number, estado: string) {
    this.protocoloService.cambiarEstadoProtocolo(id, estado).subscribe({
      next: () => this.cargarProtocolos(),
      error: (err) => console.error('Error al cambiar estado:', err)
    });
  }
}

