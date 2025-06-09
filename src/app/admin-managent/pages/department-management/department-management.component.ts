import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetInfoDepartmentComponent} from '../department-management/get-info-department/get-info-department.component';

interface departamentorules{
  nombre_departamento:string,
  disponibilidad_departamento:boolean,
}

@Component({
  selector: 'app-department-management',
  imports: [CommonModule, FormsModule,GetInfoDepartmentComponent],
  templateUrl: './department-management.component.html',
})
export class DepartmentManagementComponent { 
  mostrarFormulario = false;

  nuevoDepartamento:departamentorules={
    nombre_departamento: '',
    disponibilidad_departamento: false
  }

  listaDepartamentos:departamentorules [] = [];
  
  abrirFormulario() {
    console.log('¡Botón presionado!');
    this.mostrarFormulario = true;
  }
  
  cerrarFormulario() {
    this.mostrarFormulario = false;
  }
  
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