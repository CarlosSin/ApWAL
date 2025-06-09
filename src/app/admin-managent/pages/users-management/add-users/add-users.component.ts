import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators, FormGroup } from '@angular/forms';
import { UsuariosService, usuarioRules } from '../../users-management/get-info-users/usuarios.service';


@Component({
  selector: 'app-add-users',
  imports: [ CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './add-users.component.html',
})

// la clase principal
export class AddUsersComponent { 
  mostrarFormulario = false; //variable que controla la apretura de formulario

  abrirFormulario() { //funcion para abrir el formulario
    console.log('¡Botón presionado!');
    this.mostrarFormulario = true;
  }

  //constructor(private fb: FormBuilder){}
  private fb =inject(FormBuilder);
private usuariosService =inject(UsuariosService);

  //para controlar el formulario
  myForm: FormGroup = this.fb.group({
    no_decontrol_usuario: [0, [Validators.required]],
    nombre_pila: ['', [Validators.required]],
    primer_apellido: ['', [Validators.required]],
    segunda_apellido: ['', [Validators.required]],
    telefono: [0, [Validators.required]],
    extension: [0, [Validators.required]],
    fecha_registro: ['', [Validators.required]],
    grado_estudio: ['', [Validators.required]],
    correo_electronico: ['', [Validators.required]],
    nombre_usuario: ['', [Validators.required]],
    password: ['', [Validators.required]],
    estado_usuario: [false, [Validators.required]],
    ID_departamento_usuario: [0, [Validators.required]],
    rol: [0, [Validators.required]],
    puede_iniciarsecion: [false, [Validators.required]],
  })

  //lista para ingresar los nuevos usaurios
  listaUsuarios: usuarioRules [] = [];



  cerrarFormulario() {
    this.myForm.reset({ 
      no_decontrol_usuario:0,
      nombre_pila: '',
      primer_apellido:'',
      segunda_apellido:'',
      telefono: 0,
      extension: 0,
      fecha_registro: '',
      grado_estudio: '',
      correo_electronico: '',
      nombre_usuario:'',
      password: '',
      estado_usuario: false,
      ID_departamento_usuario: 0,
      rol: 0,
      puede_iniciarsecion: false
    });
    this.mostrarFormulario = false;
  }

  agregarUsuario() {
    if (this.myForm.valid) {
      this.listaUsuarios.push({ ...this.myForm.value as usuarioRules});
      
      const nuevoUsuario = this.myForm.value as usuarioRules;
      console.log(nuevoUsuario);
      // Envía al backend
      this.usuariosService.crearUsuarioback(nuevoUsuario).subscribe({
        next: (res) => {
          console.log('✅ Usuario guardado correctamente:', res);
          this.listaUsuarios.push(nuevoUsuario);
          
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
    this.agregarUsuario();// llamada ala funcion para agregara a la lista
  }
}