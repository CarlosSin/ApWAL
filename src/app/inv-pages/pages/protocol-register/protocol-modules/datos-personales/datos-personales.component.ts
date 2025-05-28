import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../utils/form-utils';

@Component({
  selector: 'app-datos-personales',
  imports: [ReactiveFormsModule],
  templateUrl: './datos-personales.component.html',
})
export class DatosPersonalesComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;
  myForm: FormGroup = this.fb.group({
    numInv: ['', [Validators.required,  Validators.pattern(FormUtils.numberPattern)]],
    numSupl: ['', [Validators.required, Validators.pattern(FormUtils.numberPattern)]]
  });

  onSubmit(){
    console.log(this.myForm.value)
    this.myForm.markAllAsTouched();
  }
}
