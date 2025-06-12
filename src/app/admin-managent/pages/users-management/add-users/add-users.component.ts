import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators, FormGroup } from '@angular/forms';
import { UsuariosService, usuarioRules, rol } from '../../users-management/get-info-users/usuarios.service';
import {DepartamentService,departamentorules} from '../../department-management/department.service';
import { Observable } from 'rxjs'; // Importa Observable si aún no lo tienes

@Component({
  selector: 'app-add-users',
  imports: [ CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './add-users.component.html',
})

// la clase principal
export class AddUsersComponent implements OnInit{ 
  mostrarFormulario = false; //variable que controla la apretura de formulario
  departamentosdb: departamentorules[] = [];
  
  abrirFormulario() { //funcion para abrir el formulario
    console.log('¡Botón presionado!');
    this.mostrarFormulario = true;
  }

  //constructor(private fb: FormBuilder){}
  private fb =inject(FormBuilder);
  private usuariosService =inject(UsuariosService);
  private departamentService = inject(DepartamentService);
  
   ngOnInit(): void {
      this.departamentService.getUsuarios().subscribe(data => {
      console.log('Usuarios recibidos:', data);
      this.departamentosdb = data;
    }); // Llama a la función para cargar los departamentos
  }
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
    ID_departamento_usuario: [null, [Validators.required]],
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
      ID_departamento_usuario: null,
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
          
          const rolDataToSend: rol = {
            no_decontrol_usuario: nuevoUsuario.no_decontrol_usuario, // no_decontrol_usuario del formulario
            id_rol: nuevoUsuario.rol, // 'rol' del formulario mapeado a 'id_rol' para el backend
            puede_iniciar_sesion: nuevoUsuario.puede_iniciarsecion // 'puede_iniciarsecion' del formulario
          };
          this.usuariosService.crearRolUsuarioback(rolDataToSend).subscribe({
            next: (resRol) => {
              console.log('✅ Rol guardado correctamente:', resRol);
              this.cerrarFormulario(); // Cierra el formulario solo después de que ambos se guarden correctamente
            },
            error: (errRol) => {
              console.error('❌ Error al guardar el rol:', errRol);
              // Considera si quieres revertir la creación del usuario aquí o mostrar un mensaje de error específico
              // Por ahora, el usuario se creó pero el rol no.
            }
          });

          console.log('Datos del rol a enviar:', rolDataToSend);
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