import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface departamentorules{
  id_departamento:number,
  nombre_departamento:string,
  disponibilidad_departamento:boolean,
}

@Component({
  selector: 'app-department-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './department-management.component.html',
})
export class DepartmentManagementComponent { 
  mostrarFormulario = false;

  nuevoDepartamento:departamentorules={
    id_departamento: 0,
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
    if (this.nuevoDepartamento.disponibilidad_departamento && this.nuevoDepartamento.nombre_departamento) {
      this.listaDepartamentos.push({ ...this.nuevoDepartamento });
      this.nuevoDepartamento = { 
        id_departamento: 0,
        nombre_departamento: '',
        disponibilidad_departamento: false
      };
      this.cerrarFormulario();
    }
  }
}