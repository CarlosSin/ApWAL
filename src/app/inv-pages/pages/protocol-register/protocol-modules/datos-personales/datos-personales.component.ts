import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../utils/form-utils';
import { Router } from '@angular/router';
import { FormProgressService } from '../../../../services/form-progress.service';
import { DatosPersonalesService } from '../../../../services/datos-personales.service';
import { ProtocoloService } from '../../../../services/protocolo.service';

@Component({
  selector: 'app-datos-personales',
  imports: [ReactiveFormsModule],
  templateUrl: './datos-personales.component.html',
})
export class DatosPersonalesComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private formProgressService = inject(FormProgressService);
  private investigadorService = inject(DatosPersonalesService);
  private protocoloService = inject(ProtocoloService);

  investigador: any = null;
  suplente: any = null;
  formUtils = FormUtils;

  // Aquí guardaremos el id del protocolo si existe
  protocoloId: number | null = null;

  myForm: FormGroup = this.fb.group({
    numInv: ['', [Validators.required, Validators.pattern(FormUtils.numberPattern)]],
    numSupl: ['', [Validators.required, Validators.pattern(FormUtils.numberPattern)]]
  });

  buscarInvestigador() {
    const noControl = this.myForm.get('numInv')?.value;
    if (!noControl) return;

    this.investigadorService.obtenerPorNumeroControl(noControl).subscribe({
      next: (data) => {
        this.investigador = data;
      },
      error: () => {
        this.investigador = null;
      }
    });
  }

  buscarSuplente() {
    const noControl = this.myForm.get('numSupl')?.value;
    if (!noControl) return;

    this.investigadorService.obtenerPorNumeroControl(noControl).subscribe({
      next: (data) => {
        this.suplente = data;
      },
      error: () => {
        this.suplente = null;
      }
    });
  }

  onSubmit(callback?: () => void) {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      const noInv = this.myForm.value.numInv;
      const noSupl = this.myForm.value.numSupl;
      const protocoloId = this.formProgressService.getProtocoloId();
      if (protocoloId && !isNaN(protocoloId)) {
        // Actualizar protocolo existente
        this.protocoloService.actualizarProtocolo(protocoloId, noInv, noSupl).subscribe({
          next: (res) => {
            console.log('Protocolo actualizado:', res);
            this.formProgressService.markComplete('datos-personales');
            if (callback) callback();
          },
          error: (err) => {
            console.error('Error al actualizar protocolo:', err);
          }
        });
      } else {
        // Crear nuevo protocolo
        this.protocoloService.guardarProtocolo(noInv, noSupl).subscribe({
          next: (res: any) => {
            console.log('Protocolo insertado:', res);
            this.formProgressService.setProtocoloId(res.id);// Guardamos el id para futuras ediciones
            this.formProgressService.markComplete('datos-personales');
            if (callback) callback();
          },
          error: (err) => {
            console.error('Error al guardar protocolo:', err);
          }
        });
      }
    }
  }

  guardarSinAvanzar() {
    this.onSubmit(); // solo guarda
  }

  guardarYAvanzar() {
    this.onSubmit(() => {
      this.router.navigate(['/inv/protocol-register/datos-generales']);
    });
  }
}
