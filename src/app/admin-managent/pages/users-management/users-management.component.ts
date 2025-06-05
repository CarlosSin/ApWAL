import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';

interface usuarioRules {
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
  imports: [ CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './users-management.component.html',
})

export class UsersManagementComponent { 
 
  mostrarFormulario = false;
  
  //constructor(private fb: FormBuilder){}
  private fb =inject(FormBuilder);

  myForm = this.fb.group({
    no_control: [0,[Validators.required]],
    nombres: ['',[Validators.required]],
    primer_apellido:['',[Validators.required]],
    segundo_apellido:['',[Validators.required]],
    telefono: [0,[Validators.required]],
    extension: [0,[Validators.required]],
    fecha_registro: ['',[Validators.required]],
    gradoestudios: ['',[Validators.required]],
    correo: ['',[Validators.required]],
    nombre_usuario: ['',[Validators.required]],
    password: ['',[Validators.required]],
    estado_usuario: [false,[Validators.required]],
    departamento_usuario: [0,[Validators.required]],
    rol: [0,[Validators.required]],
    puede_iniciarsecion: [false,[Validators.required]]
    
  })
  
  listaUsuarios: usuarioRules [] = [];

  abrirFormulario() {
    console.log('¡Botón presionado!');
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  agregarUsuario() {
    if (this.myForm.valid) {
      this.listaUsuarios.push({ ...this.myForm.value as usuarioRules});
      this.myForm.reset();
      this.cerrarFormulario();
    }
  }
}