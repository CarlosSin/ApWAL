import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../utils/form-utils';
import { FormProgressService } from '../../../../services/form-progress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-generales',
  imports: [ReactiveFormsModule],
  templateUrl: './datos-generales.component.html',
})
export class DatosGeneralesPComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private formProgressService = inject(FormProgressService);

  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    title: ['', [Validators.required,  ]],
    description: ['', [Validators.required, ]],
    startProtocol: ['', [Validators.required, FormUtils.dateNotInPast]],
    finishProtocol: ['', [Validators.required, FormUtils.dateNotInPast]],
  });

  onSubmit(){
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      // Guardar los datos en el backend aquí si es necesario...

      // Marcar la sección como completada
      this.formProgressService.markComplete('datos-generales');

      // Opcional: navegar automáticamente a la siguiente sección
      this.router.navigate(['/inv/protocol-register/descripcion-animal']);
    }
  }

  guardarYAvanzar() {
    this.onSubmit();
  }

 }
