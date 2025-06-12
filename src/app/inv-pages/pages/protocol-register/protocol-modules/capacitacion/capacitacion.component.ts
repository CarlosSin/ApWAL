import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormProgressService } from '../../../../services/form-progress.service';
import { CapacitacionService } from '../../../../services/capacitacion.service';

@Component({
  selector: 'app-capacitacion',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './capacitacion.component.html',
})
export class CapacitacionComponent {
private fb = inject(FormBuilder);
  private router = inject(Router);
  private formProgress = inject(FormProgressService);
  private capacitacionService = inject(CapacitacionService);


  protocoloId: number | null = null;
  myForm: FormGroup = this.fb.group({
    archivo_investigador: [null, Validators.required],
    archivo_suplente: [null, Validators.required]
  });

  archivosExistentes: { investigador?: string, suplente?: string } = {};

  ngOnInit() {
     this.protocoloId = this.formProgress.getProtocoloId();
  if (!this.protocoloId) return;

  // Buscar archivos previamente subidos
  this.capacitacionService.obtenerArchivos(this.protocoloId).subscribe({
    next: (data: any) => {
      this.archivosExistentes = {
        investigador: data.archivo_investigador || null,
        suplente: data.archivo_suplente || null
      };
    },
    error: (err) => {
      if (err.status !== 404) console.error('Error cargando archivos existentes:', err);
    }
  });
  }

  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.myForm.patchValue({ [field]: file });
    } else {
      alert('Solo se permiten archivos PDF');
    }
  }

  onSubmit(callback?: () => void) {
    if (!this.protocoloId) return;

    const formData = new FormData();
    formData.append('ID_registro_protocolo', this.protocoloId.toString());
    if (this.myForm.value.archivo_investigador)
        formData.append('archivo_investigador', this.myForm.value.archivo_investigador);
    if (this.myForm.value.archivo_suplente)
        formData.append('archivo_suplente', this.myForm.value.archivo_suplente);


    this.capacitacionService.guardar(formData).subscribe({
      next: () => {
        this.formProgress.markComplete('capacitacion');
        if (callback) {
          callback(); // redirige si se pidió
        }
      },
      error: (err) => {
        console.error('Error al guardar archivos:', err);
      }
    });
  }
  guardarSinAvanzar() {
    this.onSubmit(); // Solo guarda
  }

  guardarYAvanzar() {
    this.onSubmit(() => {
      this.router.navigate(['/inv/protocol-register/salud-ocupacional']); // Cambia si el siguiente paso es diferente
    });
  }




 }
