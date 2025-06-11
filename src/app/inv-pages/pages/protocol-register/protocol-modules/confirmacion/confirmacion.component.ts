import { Component, inject } from '@angular/core';
import { FormProgressService } from '../../../../services/form-progress.service';
import { ConfirmacionService } from '../../../../services/confirmacion.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  imports: [CommonModule],
  templateUrl: './confirmacion.component.html',
})
export class ConfirmacionComponent {
  private formProgress = inject(FormProgressService);
  private confirmacionService = inject(ConfirmacionService);
    private router = inject(Router);

  datosConfirmacion: any = null;
  protocoloId: number | null = null;

  ngOnInit() {
    this.protocoloId = this.formProgress.getProtocoloId();
    if (!this.protocoloId) return;

    this.confirmacionService.obtenerDatos(this.protocoloId).subscribe({
      next: (data) => {
        this.datosConfirmacion = data;
        this.formProgress.markComplete('confirmacion');
      },
      error: (err) => console.error('Error al obtener datos de confirmación:', err)
    });
  }

  enviarAlCICUAL() {
  if (!this.protocoloId) return;
  this.confirmacionService .enviarAlCICUAL(this.protocoloId).subscribe({
    next: () => {
      this.formProgress.markComplete('confirmacion');
      this.router.navigate(['/inv/underreview-protocol']);
    },
    error: (err) => console.error('Error al enviar al CICUAL:', err)
  });
}
 }
