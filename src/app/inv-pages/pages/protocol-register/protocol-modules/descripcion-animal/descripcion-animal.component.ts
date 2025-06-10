import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../utils/form-utils';
import { Router } from '@angular/router';
import { FormProgressService } from '../../../../services/form-progress.service';
import {MostrarCatalogoComponent} from '../descripcion-animal/mostrar-catalogo/mostrar-catalogo.component';

@Component({
  selector: 'app-descripcion-animal',
  imports: [ReactiveFormsModule,MostrarCatalogoComponent],
  templateUrl: './descripcion-animal.component.html',
})
export class DescripcionAnimalComponent {
private fb = inject(FormBuilder);
 private router = inject(Router);
  private formProgressService = inject(FormProgressService);

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
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      // Guardar los datos en el backend aquí si es necesario...

      // Marcar la sección como completada
      this.formProgressService.markComplete('descripcion-animal');

      // Opcional: navegar automáticamente a la siguiente sección
      this.router.navigate(['/inv/protocol-register/procedimientos']);
    }
  }

  guardarYAvanzar() {
    this.onSubmit();
  }
 }
