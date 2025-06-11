import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcedimientosExperimentalesService } from '../../../../services/procedimientos.service';
import { FormProgressService } from '../../../../services/form-progress.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proc-experimentales',
  templateUrl: './proc-experimentales.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class ProcExperimentalesComponent {
  private fb = inject(FormBuilder);
  private procedimientosService = inject(ProcedimientosExperimentalesService);
  private formProgressService = inject(FormProgressService);
  private router = inject(Router);

  protocoloId: number | null = null;

  form!: FormGroup;

  procedimientos = [
    { id: 'agua_alimento', label: 'Restricción de agua y/o alimento' },
    { id: 'inoculacion_microorganismos', label: 'Inoculación de microorganismos y/o derivados' },
    { id: 'anticuerpos_monoclonales', label: 'Producción de anticuerpos monoclonales' },
    { id: 'cateterizacion', label: 'Cateterización y/o entubación' },
    { id: 'inoculacion_material', label: 'Inoculación de material de origen humano/animal' },
    { id: 'anticuerpos_policlonales', label: 'Producción de anticuerpos policlonales' },
    { id: 'extraccion_fluidos', label: 'Extracción de líquidos y/o fluidos' },
    { id: 'estudios_ld50', label: 'Estudios LD50 o ID50' },
    { id: 'cirugia_recuperacion', label: 'Procedimientos de cirugía con recuperación' },
    { id: 'cirugia_sin_recuperacion', label: 'Procedimientos de cirugía sin recuperación' },
    { id: 'modificacion_conducta', label: 'Modificación de conducta' },
    { id: 'restriccion_fisica', label: 'Restricción física' },
    { id: 'agentes_peligrosos', label: 'Agentes peligrosos' },
  ];

  ngOnInit(): void {
    this.protocoloId = this.formProgressService.getProtocoloId();
    this.form = this.fb.group({
      alojamiento_animal: [''],
      procedimientos: this.fb.group({}),
      otros_comentarios: ['']
    });

    // Inicializar los controles de procedimientos
    const procGroup = this.form.get('procedimientos') as FormGroup;
    this.procedimientos.forEach(proc =>
      procGroup.addControl(proc.id, this.fb.group({
        seleccionado: [false],
        descripcion: ['']
      }))
    );

    if (this.protocoloId) {
      this.procedimientosService.obtenerPorProtocolo(this.protocoloId).subscribe({
        next: data => {
          this.form.patchValue(data);
        },
        error: err => {
          console.warn('No hay datos previos de procedimientos:', err);
        }
      });
    }
  }

  guardar(avanzar: boolean) {
    if (!this.protocoloId) return;

    const payload = {
      ID_registro_protocolo: this.protocoloId,
      alojamiento_animal: this.form.value.alojamiento_animal,
      otros_comentarios: this.form.value.otros_comentarios,
      procedimientos: {}
    };

    const procedimientosForm = this.form.get('procedimientos')?.value;
    for (const key in procedimientosForm) {
      const item = procedimientosForm[key];
      if (item.seleccionado) {
        payload.procedimientos[key] = item.descripcion || '';
      }
    }

    this.procedimientosService.guardar(payload).subscribe({
      next: () => {
        this.formProgressService.markComplete('procedimientos');
        if (avanzar) {
          this.router.navigate(['/inv/protocol-register/alternativas']);
        }
      },
      error: err => {
        console.error('Error al guardar procedimientos:', err);
      }
    });
  }
}
