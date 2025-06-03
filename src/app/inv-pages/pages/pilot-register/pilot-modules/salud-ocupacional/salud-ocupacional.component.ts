import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../utils/form-utils';
import { Router } from '@angular/router';
import { FormProgressService } from '../../../../services/form-progress.service';

@Component({
  selector: 'app-salud-ocupacional',
  imports: [ReactiveFormsModule],
  templateUrl: './salud-ocupacional.component.html',
})
export class SaludOcupacionalPComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private formProgressService = inject(FormProgressService);

    formUtils = FormUtils;

    myForm: FormGroup = this.fb.group({
    procDescription: ['', [Validators.required, ]],
    equipDescription: ['', [Validators.required, ]],
    nomAgenteInfeccioso: ['', [Validators.required, ]],
    nomRadioisotopos: ['', [Validators.required, ]],
    nomCarcinogenos: ['', [Validators.required, ]],
    nomToxicos: ['', [Validators.required, ]],
    dosisAgenteInfeccioso: ['', [Validators.required, ]],
    dosisRadioisotopos: ['', [Validators.required, ]],
    dosisCarcinogenos: ['', [Validators.required, ]],
    dosisToxicos: ['', [Validators.required, ]],
    viaAgenteInfeccioso: ['', [Validators.required, ]],
    viaRadioisotopos: ['', [Validators.required, ]],
    viaCarcinogenos: ['', [Validators.required, ]],
    viaToxicos: ['', [Validators.required, ]],
    usoAgenteInfeccioso: ['', [Validators.required, ]],
    usoRadioisotopos: ['', [Validators.required, ]],
    usoCarcinogenos: ['', [Validators.required, ]],
    usoToxicos: ['', [Validators.required, ]],


  });

  onSubmit(){
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      // Guardar los datos en el backend aquí si es necesario...

      // Marcar la sección como completada
      this.formProgressService.markComplete('salud-ocupacional');

      // Opcional: navegar automáticamente a la siguiente sección
      this.router.navigate(['/protocol-register/salud-ocupacional']);
    }
  }

  guardarYAvanzar() {
    this.onSubmit();
  }


}
