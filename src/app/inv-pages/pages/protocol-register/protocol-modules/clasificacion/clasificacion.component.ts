import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormProgressService } from '../../../../services/form-progress.service';
import { ClasificacionService } from '../../../../services/clasificacion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clasificacion',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clasificacion.component.html',
})
export class ClasificacionComponent {
private fb = inject(FormBuilder);
  private router = inject(Router);
  private formProgressService = inject(FormProgressService);
  private clasificacionService = inject(ClasificacionService);

  protocoloId: number | null = null;
  myForm!: FormGroup;
  modoEdicion = false;

  ngOnInit(): void {
  this.protocoloId = this.formProgressService.getProtocoloId();

  this.myForm = this.fb.group({
    clasificacion: ['', Validators.required]
  });

  if (this.protocoloId) {
    this.clasificacionService.obtenerPorProtocolo(this.protocoloId).subscribe({
      next: (data) => {
        this.myForm.patchValue({ clasificacion: data.clasificacion });
      },
      error: (err) => {
        if (err.status !== 404) {
          console.error('Error al cargar clasificación:', err);
        }
      }
    });
  }
}

  onSubmit(callback?: () => void) {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid && this.protocoloId) {
      const payload = {
        ID_registro_protocolo: this.protocoloId,
        clasificacion: this.myForm.value.clasificacion
      };

      this.clasificacionService.guardar(payload).subscribe({
        next: () => {
          this.formProgressService.markComplete('clasificacion');
          if (callback) callback();
        },
        error: (err) => {
          console.error('Error al guardar clasificación:', err);
        }
      });
    }
  }

  guardarSinAvanzar() {
    this.onSubmit();
  }

  guardarYAvanzar() {
    this.onSubmit(() => {
      this.router.navigate(['/inv/protocol-register/salud-ocupacional']);
    });
  }

 }
