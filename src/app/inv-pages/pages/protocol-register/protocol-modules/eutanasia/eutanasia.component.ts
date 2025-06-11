import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormProgressService } from '../../../../services/form-progress.service';
import { EutanasiaService } from '../../../../services/eutanasia.service';
import { AnimalesService } from '../../../../services/animales.service';

@Component({
  selector: 'app-eutanasia',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './eutanasia.component.html',
})
export class EutanasiaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private formProgressService = inject(FormProgressService);
  private eutanasiaService = inject(EutanasiaService);
  private animalesService = inject(AnimalesService);

  protocoloId: number | null = null;
  eutanasiaForm!: FormGroup;
  animales: any[] = [];

  ngOnInit(): void {
    this.protocoloId = this.formProgressService.getProtocoloId();

    this.eutanasiaForm = this.fb.group({
      registros: this.fb.array([])
    });

    if (this.protocoloId) {
      this.animalesService.obtenerPorProtocolo(this.protocoloId).subscribe(animales => {
        this.animales = animales;
        const registrosArray = this.eutanasiaForm.get('registros') as FormArray;
        animales.forEach((animal: any) => {
          registrosArray.push(this.fb.group({
            ID_registro_animales_protocolo: [animal.ID_registro_animales_protocolo],
            agente: [''],
            dosis: [''],
            via_administracion: ['']
          }));
        });

        // Si ya existen datos, precargar
        this.eutanasiaService.obtenerPorProtocolo(this.protocoloId!).subscribe({
          next: registros => this.setDatosExistentes(registros),
          error: err => console.warn('No hay datos de eutanasia registrados aún:', err)
        });
      });
    }
  }

  setDatosExistentes(registros: any[]) {
    const registrosArray = this.eutanasiaForm.get('registros') as FormArray;
    registros.forEach((registro: any, index: number) => {
      if (registrosArray.at(index)) {
        registrosArray.at(index).patchValue(registro);
      }
    });
  }

  guardar(avanzar: boolean = false) {
    if (!this.protocoloId) return;

    const datos = {
      ID_registro_protocolo: this.protocoloId,
      registros: this.eutanasiaForm.value.registros
    };

    this.eutanasiaService.guardar(datos).subscribe({
      next: () => {
        this.formProgressService.markComplete('eutanasia');
        if (avanzar) {
          this.router.navigate(['/inv/protocol-register/clasificacion']);
        }
      },
      error: err => console.error('Error al guardar eutanasia:', err)
    });
  }

  get registrosControls(): FormGroup[] {
    return (this.eutanasiaForm.get('registros') as FormArray).controls as FormGroup[];
  }
}
