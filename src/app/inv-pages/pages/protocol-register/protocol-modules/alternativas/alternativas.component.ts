import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../utils/form-utils';

@Component({
  selector: 'app-alternativas',
  imports: [ReactiveFormsModule],
  templateUrl: './alternativas.component.html',
})
export class AlternativasComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;
  myForm: FormGroup = this.fb.group({
    description: ['', [Validators.required, ]],
  });

  onSubmit(){
    console.log(this.myForm.value)
    this.myForm.markAllAsTouched();
  }

 }
