import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlternativasService } from '../../../../services/alternativas.service';
import { FormProgressService } from '../../../../services/form-progress.service';
import { FormUtils } from '../../../../../utils/form-utils';

@Component({
  selector: 'app-alternativas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './alternativas.component.html',
})
export class AlternativasComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alternativasService = inject(AlternativasService);
  private formProgressService = inject(FormProgressService);

  formUtils = FormUtils;
  protocoloId: number | null = null;

  myForm: FormGroup = this.fb.group({
    description: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.protocoloId = this.formProgressService.getProtocoloId();

    if (this.protocoloId) {
      this.alternativasService.obtenerPorProtocolo(this.protocoloId).subscribe({
        next: (data) => {
          this.myForm.patchValue({ description: data.descripcion_alternativas });
        },
        error: (err) => {
          console.warn('No hay datos previos de alternativas:', err);
        }
      });
    }
  }

  guardar(avanzar: boolean) {
    if (!this.protocoloId) return;
    this.myForm.markAllAsTouched();

    if (this.myForm.invalid) return;

    const payload = {
      ID_registro_protocolo: this.protocoloId,
      descripcion_alternativas: this.myForm.value.description
    };

    this.alternativasService.guardar(payload).subscribe({
      next: () => {
        this.formProgressService.markComplete('alternativas');
        if (avanzar) {
          this.router.navigate(['/inv/protocol-register/agentes-ATA']);
        }
      },
      error: (err) => {
        console.error('Error al guardar alternativas:', err);
      }
    });
  }

  guardarYAvanzar() {
    this.guardar(true);
  }

  soloGuardar() {
    this.guardar(false);
  }
}
