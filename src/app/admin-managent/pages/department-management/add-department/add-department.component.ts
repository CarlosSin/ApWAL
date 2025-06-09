import { Component,inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators, FormGroup } from '@angular/forms';
import { DepartamentService, departamentorules} from '../../department-management/department.service';


@Component({
  selector: 'app-add-department',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './add-department.component.html',
})

//clase principal
export class AddDepartmentComponent { 
  mostrarFormulario = false; //variable que controla la apretura de formulario

  abrirFormulario() { //funcion para abrir el formulario
    console.log('¡Botón presionado!');
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.myForm.reset({ 
      nombre_departamento: '',
      disponibilidad_departamento: false
    });
    this.mostrarFormulario = false;
  }

  //constructor
  private fb =inject(FormBuilder);
  private deptoService =inject(DepartamentService);

//para controlar el formulario
  myForm: FormGroup = this.fb.group({
    nombre_departamento: ['', [Validators.required]],
    disponibilidad_departamento: [false, [Validators.required]],
  })
  
  //lista para ingresar los nuevos departamentos
  listaDepartamentos:departamentorules [] = [];

  agregardepto(){
    if (this.myForm.valid){
      this.listaDepartamentos.push({ ...this.myForm.value as departamentorules});
      const nuevodepto = this.myForm.value as departamentorules;
      console.log(nuevodepto);
      // Envía al backend
      this.deptoService.creardepartamentoback(nuevodepto).subscribe({
        next: (res) => {
          console.log('✅ Usuario guardado correctamente:', res);
          this.listaDepartamentos.push(nuevodepto);
          
          this.cerrarFormulario();
        },
        error: (err) => {
          console.error('❌ Error al guardar usuario:', err);
        }
      });
      this.cerrarFormulario();
    }
  }
  
  //funcion que valida campo por campo
  isValidFiel(fieldName:string): boolean|null{
    return (
      this.myForm.controls[fieldName].errors && 
      this.myForm.controls[fieldName].touched
    );
  }
  
  //funcion para saber si estan llenos los campos
  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    this.agregardepto();// llamada ala funcion para agregara a la lista
  }

}

/**
export class DepartmentManagementComponent { 

  nuevoDepartamento:departamentorules={
    nombre_departamento: '',
    disponibilidad_departamento: false
  }

  listaDepartamentos:departamentorules [] = [];
    
  agregarUsuario() {
    if (this.nuevoDepartamento.nombre_departamento) {
      this.listaDepartamentos.push({ ...this.nuevoDepartamento });
      this.nuevoDepartamento = {
        nombre_departamento: '',
        disponibilidad_departamento: false
      };
      this.cerrarFormulario();
    }
  }
}
 */