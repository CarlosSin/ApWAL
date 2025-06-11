import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../utils/form-utils';
import { FormProgressService } from '../../../../services/form-progress.service';
import { Router } from '@angular/router';
import { DatosGeneralesService } from '../../../../services/datos-generales.service';

@Component({
  selector: 'app-datos-generales',
  imports: [ReactiveFormsModule],
  templateUrl: './datos-generales.component.html',
})
export class DatosGeneralesComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private formProgressService = inject(FormProgressService);
  private datosService = inject(DatosGeneralesService);

  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startProtocol: ['', [Validators.required, FormUtils.dateNotInPast]],
    finishProtocol: ['', [Validators.required, FormUtils.dateNotInPast]],
    es_colaboracion: [null, [Validators.required]]
  });

  protocoloId: number | null = null;
  modoEdicion = false;

  ngOnInit() {
    this.protocoloId = this.formProgressService.getProtocoloId();

    if (this.protocoloId) {
      this.datosService.obtenerPorProtocolo(this.protocoloId).subscribe({
        next: (data: any) => {
          this.modoEdicion = true;
          this.myForm.patchValue({
            title: data.titulo,
            description: data.descripcion,
            startProtocol: data.fecha_inicio,
            finishProtocol: data.fecha_termino,
            es_colaboracion: this.myForm.value.es_colaboracion
          });
        },
        error: (err) => {
          if (err.status === 404) {
          console.log('No hay datos generales todavía, modo creación');
          this.modoEdicion = false;
        } else {
          console.error('Error inesperado al consultar datos generales:', err);
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
        titulo: this.myForm.value.title,
        descripcion: this.myForm.value.description,
        fecha_inicio: this.myForm.value.startProtocol,
        fecha_termino: this.myForm.value.finishProtocol,
        es_colaboracion: this.myForm.value.es_colaboracion
      };
      console.log('Payload que se enviará:', payload);

      const peticion = this.modoEdicion
        ? this.datosService.actualizar(this.protocoloId, payload)
        : this.datosService.guardar(payload);

      peticion.subscribe({
        next: () => {
          this.formProgressService.markComplete('datos-generales');
          this.modoEdicion = true;
          if (callback) callback();
        },
        error: (err) => {
          console.error('Error al guardar datos generales:', err);
        }
      });
    }
  }

  guardarYAvanzar() {
    this.onSubmit(() => {
      this.router.navigate(['/inv/protocol-register/descripcion-animal']);
    });
  }

  guardarSinAvanzar() {
    this.onSubmit();
  }
}
