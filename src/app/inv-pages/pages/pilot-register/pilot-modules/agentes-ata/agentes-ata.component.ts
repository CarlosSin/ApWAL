import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormProgressService } from '../../../../services/form-progress.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../utils/form-utils';

@Component({
  selector: 'app-agentes-ata',
  imports: [ReactiveFormsModule],
  templateUrl: './agentes-ata.component.html',
})
export class AgentesAtaPComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private formProgressService = inject(FormProgressService);

  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    agente: ['', [Validators.required,  ]],
    via: ['', [Validators.required, ]],
    dosis: ['', [Validators.required,]],
    dosisComp: ['', [Validators.required,]],
    frecuencia: ['', [Validators.required,]],
  });

  onSubmit(){
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      // Guardar los datos en el backend aquí si es necesario...

      // Marcar la sección como completada
      this.formProgressService.markComplete('agentes-ATA');

      // Opcional: navegar automáticamente a la siguiente sección
      this.router.navigate(['/protocol-register/agentes-ATA']);
    }
  }

  guardarYAvanzar() {
    this.onSubmit();
  }

 }
