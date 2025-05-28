import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../utils/form-utils';

@Component({
  selector: 'app-datos-generales',
  imports: [ReactiveFormsModule],
  templateUrl: './datos-generales.component.html',
})
export class DatosGeneralesComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;
  myForm: FormGroup = this.fb.group({
    title: ['', [Validators.required,  ]],
    description: ['', [Validators.required, ]],
    startProtocol: ['', [Validators.required, FormUtils.dateNotInPast]],
    finishProtocol: ['', [Validators.required, FormUtils.dateNotInPast]],
  });

  onSubmit(){
    console.log(this.myForm.value)
    this.myForm.markAllAsTouched();
  }

 }
