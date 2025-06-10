import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../utils/form-utils';
import { Router } from '@angular/router';
import { FormProgressService } from '../../../../services/form-progress.service';

@Component({
  selector: 'app-datos-personales',
  imports: [ReactiveFormsModule],
  templateUrl: './datos-personales.component.html',
})
export class DatosPersonalesComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private formProgressService = inject(FormProgressService);

  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    numInv: ['', [Validators.required,  Validators.pattern(FormUtils.numberPattern)]],
    numSupl: ['', [Validators.required, Validators.pattern(FormUtils.numberPattern)]]
  });

  onSubmit(){
   this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      // Guardar los datos en el backend aquí si es necesario...

      // Marcar la sección como completada
      this.formProgressService.markComplete('datos-personales');

      // Opcional: navegar automáticamente a la siguiente sección
      this.router.navigate(['/inv/protocol-register/datos-generales']);
    }
  }

  guardarYAvanzar() {
    this.onSubmit();
  }
}
