import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormProgressService } from '../../../../services/form-progress.service';
import { AgenteAtaService } from '../../../../services/agente-ata.service';
import { AnimalesService } from '../../../../services/animales.service';

@Component({
  selector: 'app-agente-ata',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agentes-ata.component.html',
})
export class AgentesAtaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private formProgressService = inject(FormProgressService);
  private agenteAtaService = inject(AgenteAtaService);
  private animalesService = inject(AnimalesService);

  protocoloId: number | null = null;
  agentesForm!: FormGroup;
  animales: any[] = [];

  ngOnInit(): void {
    this.protocoloId = this.formProgressService.getProtocoloId();

    this.agentesForm = this.fb.group({
      agentes: this.fb.array([])
    });

    if (this.protocoloId) {
      this.animalesService.obtenerPorProtocolo(this.protocoloId).subscribe(animales => {
        this.animales = animales;
        const agentesArray = this.agentesForm.get('agentes') as FormArray;
        animales.forEach((animal: any) => {
          agentesArray.push(this.fb.group({
            ID_registro_animales_protocolo: [animal.ID_registro_animales_protocolo],
            agente: [''],
            via_administracion: [''],
            dosis: [''],
            dosis_complementaria: [''],
            frecuencia_administracion: [''],
            medios: ['']
          }));
        });

        // Cargar datos si ya existen
        this.agenteAtaService.obtenerPorProtocolo(this.protocoloId!).subscribe({
          next: registros => {
            this.setDatosExistentes(registros);
          },
          error: err => console.warn('No hay registros previos de agentes ATA:', err)
        });
      });
    }
  }

  setDatosExistentes(registros: any[]) {
    const agentesArray = this.agentesForm.get('agentes') as FormArray;
    registros.forEach((registro: any, index: number) => {
      if (agentesArray.at(index)) {
        agentesArray.at(index).patchValue(registro);
      }
    });
  }

  guardar(avanzar: boolean = false) {
  if (!this.protocoloId) return;

  const datos = {
    ID_registro_protocolo: this.protocoloId,
    registros: this.agentesForm.value.agentes
  };

  this.agenteAtaService.guardar(datos).subscribe({
    next: () => {
      this.formProgressService.markComplete('agentes-ATA'); // nota: cuidado con mayúsculas/minúsculas si no coinciden
      if (avanzar) {
        this.router.navigate(['/inv/protocol-register/eutanasia']);
      }
    },
    error: err => console.error('Error al guardar agentes ATA:', err)
  });
}

  get agentesControls(): FormGroup[] {
    return (this.agentesForm.get('agentes') as FormArray).controls as FormGroup[];
  }
}
