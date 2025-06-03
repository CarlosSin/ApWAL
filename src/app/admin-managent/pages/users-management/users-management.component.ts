import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface usuariorRules {
  no_control: number,
  nombres:string,
  primer_apellido:string,
  segundo_apellido:string,
  telefono: number,
  extension: number,
  fecha_registro: string,
  gradoestudios: string,
  correo:string,
  nombre_usuario:string,  
  password:string,
  estado_usuario:boolean,
  departamento_usuario: number,
  rol:number,
  puede_iniciarsecion:boolean
}

@Component({
  selector: 'app-users-management',
  imports: [ CommonModule, FormsModule],
  templateUrl: './users-management.component.html',
})

export class UsersManagementComponent { 
 
  mostrarFormulario = false;

  nuevoUsuario:usuariorRules = {
    no_control: 0,
    nombres: '',
    primer_apellido:'',
    segundo_apellido:'',
    telefono: 0,
    extension: 0,
    fecha_registro: '',
    gradoestudios: '',
    correo: '',
    nombre_usuario: '',
    password: '',
    estado_usuario: false,
    departamento_usuario: 0,
    rol: 0,
    puede_iniciarsecion: false
  };

  
  listaUsuarios:usuariorRules [] = [];

  abrirFormulario() {
    console.log('¡Botón presionado!');
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  agregarUsuario() {
    if (this.nuevoUsuario.nombres && this.nuevoUsuario.correo) {
      this.listaUsuarios.push({ ...this.nuevoUsuario });
      this.nuevoUsuario = { 
        no_control: 0,
        nombres: '',
        primer_apellido:'',
        segundo_apellido:'',
        telefono: 0,
        extension: 0,
        fecha_registro: '',
        gradoestudios: '',
        correo: '',
        nombre_usuario: '',
        password: '',
        estado_usuario: false,
        departamento_usuario: 0,
        rol: 0,
        puede_iniciarsecion: false
      };
      this.cerrarFormulario();
    }
  }
}
