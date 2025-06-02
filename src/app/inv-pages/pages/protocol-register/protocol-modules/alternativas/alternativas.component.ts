import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../utils/form-utils';
import { Router } from '@angular/router';
import { FormProgressService } from '../../../../services/form-progress.service';

@Component({
  selector: 'app-alternativas',
  imports: [ReactiveFormsModule],
  templateUrl: './alternativas.component.html',
})
export class AlternativasComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private formProgressService = inject(FormProgressService);

  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    description: ['', [Validators.required, ]],
  });

  onSubmit(){
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      // Guardar los datos en el backend aquí si es necesario...

      // Marcar la sección como completada
      this.formProgressService.markComplete('alternativas');

      // Opcional: navegar automáticamente a la siguiente sección
      this.router.navigate(['/protocol-register/alternativas']);
    }
  }

  guardarYAvanzar() {
    this.onSubmit();
  }

 }
