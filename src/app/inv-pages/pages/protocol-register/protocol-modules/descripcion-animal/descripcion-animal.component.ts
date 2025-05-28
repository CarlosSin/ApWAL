import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../utils/form-utils';

@Component({
  selector: 'app-descripcion-animal',
  imports: [ReactiveFormsModule],
  templateUrl: './descripcion-animal.component.html',
})
export class DescripcionAnimalComponent {
private fb = inject(FormBuilder);
  formUtils = FormUtils;
  myForm: FormGroup = this.fb.group({
    justificacionUso: ['', [Validators.required, ]],
    animales: this.fb.array([])

  });

  createAnimalFormGroup(): FormGroup {
  return this.fb.group({
    especie: ['', Validators.required],
    cepa: ['', Validators.required],
    sexo: ['', Validators.required],
    edadPeso: ['', Validators.required],
    frecuenciaUso: ['', Validators.required],
    cantidad: ['', [Validators.required, Validators.pattern(FormUtils.numberPattern)]]
  });
}


  get animales(){
    return this.myForm.get('animales') as FormArray;
  }
  onAddToAnimales(){
    this.animales.push(this.createAnimalFormGroup());
  }

    onDeleteFavorite(index: number){
  this.animales.removeAt(index);
}

  onSubmit(){
    console.log(this.myForm.value)
    this.myForm.markAllAsTouched();
  }

 }
