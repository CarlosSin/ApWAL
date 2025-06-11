import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '../../../../../utils/form-utils';
import { FormProgressService } from '../../../../services/form-progress.service';
import { SaludOcupacionalService } from '../../../../services/salud-ocupacional.service';
import { Router } from '@angular/router';
import { AnimalesService } from '../../../../services/animales.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-salud-ocupacional',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './salud-ocupacional.component.html',
})
export class SaludOcupacionalComponent {
  private fb = inject(FormBuilder);
  private saludService = inject(SaludOcupacionalService);
  private formProgress = inject(FormProgressService);
  private router = inject(Router);
  private animalesService = inject(AnimalesService);

  formUtils = FormUtils;
  protocoloId: number | null = null;
  animales: any[] = [];

  myForm: FormGroup = this.fb.group({
    nivel_bioseguridad: ['', Validators.required],
    equipDescription: ['', Validators.required],
    procDescription: ['', Validators.required],
    datosAnimales: this.fb.array([])
  });

  get datosAnimales() {
    return this.myForm.get('datosAnimales') as FormArray;
  }

  ngOnInit() {
    this.protocoloId = this.formProgress.getProtocoloId();
    if (!this.protocoloId) return;

    this.animalesService.obtenerPorProtocolo(this.protocoloId).subscribe({
      next: (animales) => {
        this.animales = animales;
        animales.forEach((a: any) => {
          this.datosAnimales.push(this.fb.group({
            ID_registro_animales_protocolo: [a.ID_registro_animales_protocolo],
            agentes_infecciosos: [''],
            radioisotopos: [''],
            carcinogenos: [''],
            toxicos: ['']
          }));
        });

        this.saludService.obtenerPorProtocolo(this.protocoloId!).subscribe({
          next: (data: any) => {
            this.myForm.patchValue({
              nivel_bioseguridad: data.nivel_bioseguridad,
              equipDescription: data.equipos,
              procDescription: data.procedimientos
            });

            data.datos.forEach((registro: any, i: number) => {
              if (this.datosAnimales.at(i)) {
                this.datosAnimales.at(i).patchValue(registro);
              }
            });
          },
          error: (err) => {
            if (err.status !== 404) {
              console.error('Error cargando datos previos:', err);
            }
          }
        });
      },
      error: (err) => console.error('Error al cargar animales:', err)
    });
  }

  onSubmit(callback?: () => void) {
  this.myForm.markAllAsTouched();
  if (this.myForm.valid && this.protocoloId) {
    const datosConProtocolo = this.myForm.value.datosAnimales.map((dato: any) => ({
      ...dato,
      ID_registro_protocolo: this.protocoloId
    }));

    const payload = {
      ID_registro_protocolo: this.protocoloId,
      nivel_bioseguridad: this.myForm.value.nivel_bioseguridad,
      equipos: this.myForm.value.equipDescription,
      procedimientos: this.myForm.value.procDescription,
      datos: datosConProtocolo
    };

    this.saludService.guardar(payload).subscribe({
      next: () => {
        this.formProgress.markComplete('salud-ocupacional');
        if (callback) callback();
      },
      error: (err) => console.error('Error al guardar:', err)
    });
  }
}

  guardarSinAvanzar() {
    this.onSubmit();
  }

  guardarYAvanzar() {
    this.onSubmit(() => {
      this.router.navigate(['/inv/protocol-register/confirmacion']);
    });
  }
}
