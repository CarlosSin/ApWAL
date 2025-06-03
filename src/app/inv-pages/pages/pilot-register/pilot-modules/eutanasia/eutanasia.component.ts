import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormProgressService } from '../../../../services/form-progress.service';
import { FormUtils } from '../../../../../utils/form-utils';

@Component({
  selector: 'app-eutanasia',
  imports: [ReactiveFormsModule],
  templateUrl: './eutanasia.component.html',
})
export class EutanasiaPComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private formProgressService = inject(FormProgressService);

  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    agente: ['', [Validators.required,  ]],
    via: ['', [Validators.required, ]],
    dosis: ['', [Validators.required,]],
  });

  onSubmit(){
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      // Guardar los datos en el backend aquí si es necesario...

      // Marcar la sección como completada
      this.formProgressService.markComplete('eutanasia');

      // Opcional: navegar automáticamente a la siguiente sección
      this.router.navigate(['/protocol-register/eutanasia']);
    }
  }

  guardarYAvanzar() {
    this.onSubmit();
  }

 }
