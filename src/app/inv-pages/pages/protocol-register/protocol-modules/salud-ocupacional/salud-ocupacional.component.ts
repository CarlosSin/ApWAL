import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../utils/form-utils';

@Component({
  selector: 'app-salud-ocupacional',
  imports: [ReactiveFormsModule],
  templateUrl: './salud-ocupacional.component.html',
})
export class SaludOcupacionalComponent {

  private fb = inject(FormBuilder);
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
    console.log(this.myForm.value)
    this.myForm.markAllAsTouched();
  }


}
