import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators, FormGroup } from '@angular/forms';


export interface usuarioRules {
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
  selector: 'app-add-users',
  imports: [ CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './add-users.component.html',
})
export class AddUsersComponent { 
  mostrarFormulario = false;
  
  //constructor(private fb: FormBuilder){}
  private fb =inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
    no_control: [0,[Validators.required,Validators.min(1)]],
    nombres: ['',[Validators.required]],
    primer_apellido:['',[Validators.required]],
    segundo_apellido:['',[Validators.required]],
    telefono: [0,[Validators.required,Validators.min(1)]],
    extension: [0,[Validators.required,Validators.min(1)]],
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
    this.myForm.reset({ 
      no_control:0,
      nombres: '',
      primer_apellido:'',
      segundo_apellido:'',
      telefono: 0,
      extension: 0,
      fecha_registro: '',
      gradoestudios: '',
      correo: '',
      nombre_usuario:'',
      password: '',
      estado_usuario: false,
      departamento_usuario: 0,
      rol: 0,
      puede_iniciarsecion: false
    });
  }

  agregarUsuario() {
    if (this.myForm.valid) {
      this.listaUsuarios.push({ ...this.myForm.value as usuarioRules});
      this.myForm.reset({ 
      no_control:0,
      nombres: '',
      primer_apellido:'',
      segundo_apellido:'',
      telefono: 0,
      extension: 0,
      fecha_registro: '',
      gradoestudios: '',
      correo: '',
      nombre_usuario:'',
      password: '',
      estado_usuario: false,
      departamento_usuario: 0,
      rol: 0,
      puede_iniciarsecion: false
      });
      this.cerrarFormulario();
    }
  }

  isValidFiel(fieldName:string): boolean|null{
    return (
      this.myForm.controls[fieldName].errors && 
      this.myForm.controls[fieldName].touched
    );
  }
  
  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset(
      { no_control:0,
          nombres: '',
          primer_apellido:'',
          segundo_apellido:'',
          telefono: 0,
          extension: 0,
          fecha_registro: '',
          gradoestudios: '',
          correo: '',
          nombre_usuario:'',
          password: '',
          estado_usuario: false,
          departamento_usuario: 0,
          rol: 0,
          puede_iniciarsecion: false
        }
    );
  }
}