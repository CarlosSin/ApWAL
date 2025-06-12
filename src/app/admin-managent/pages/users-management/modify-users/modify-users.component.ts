import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {usuarioRules} from '../get-info-users/usuarios.service'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-modify-users',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modify-users.component.html',
})
export class ModifyUsersComponent implements OnInit{ 
    // Input: Recibe el usuario a modificar del componente padre
  @Input('user') userToModify!: usuarioRules;

  // Output: Emite un evento cuando el formulario se cierra (ya sea por guardar o cancelar)
  @Output() formClosed = new EventEmitter<void>();

  // Output: Emite el usuario modificado cuando se guarda (opcional, para notificar al padre)
  @Output() userSaved = new EventEmitter<usuarioRules>();

  userForm!: FormGroup;

  ngOnInit(): void {
    // Inicializa el formulario reactivo con los datos del usuario que se pasa por Input
    if (this.userToModify) {
      this.userForm = new FormGroup({
        // El número de control no debería ser modificable, es un identificador
        no_decontrol_usuario: new FormControl({ value: this.userToModify.no_decontrol_usuario, disabled: true }),
        nombre_pila: new FormControl(this.userToModify.nombre_pila, Validators.required),
        primer_apellido: new FormControl(this.userToModify.primer_apellido, Validators.required),
        segunda_apellido: new FormControl(this.userToModify.segunda_apellido, Validators.required),
        telefono: new FormControl(this.userToModify.telefono, Validators.required),
        extension:new FormControl(this.userToModify.extension, Validators.required),
        fecha_registro: new FormControl({ value: this.userToModify.fecha_registro, disabled: true }),
        correo_electronico: new FormControl(this.userToModify.correo_electronico, Validators.required),
        nombre_usuario:new FormControl({ value: this.userToModify.nombre_usuario, disabled: true }),  
        password:new FormControl(this.userToModify.password, Validators.required),
        grado_estudio: new FormControl(this.userToModify.grado_estudio, Validators.required),
        estado_usuario: new FormControl(this.userToModify.estado_usuario, Validators.required),
        ID_departamento_usuario:new FormControl({ value: this.userToModify.ID_departamento_usuario, disabled: true })
        // Agrega aquí los demás campos que desees modificar
      });
    }
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.userForm.valid) {
      // Combina los valores del formulario con el número de control (que está deshabilitado)
      const updatedUser: usuarioRules = {
        ...this.userToModify, // Mantiene todas las propiedades originales
        ...this.userForm.getRawValue() // Obtiene todos los valores, incluyendo los deshabilitados
      };

      console.log('Usuario a guardar:', updatedUser);
      // Aquí deberías llamar a tu servicio para guardar los cambios en la base de datos
      // Por ejemplo: this.usuariosService.updateUsuario(updatedUser).subscribe(() => { ... });

      this.userSaved.emit(updatedUser); // Emite el usuario actualizado
      this.onCancel(); // Cierra el formulario después de guardar
    } else {
      console.log('Formulario inválido. Por favor, revisa los campos.');
      // Opcional: Mostrar un mensaje al usuario o resaltar los campos inválidos
    }
  }

  // Método para cancelar la modificación y cerrar el formulario
  onCancel(): void {
    this.formClosed.emit(); // Emite el evento para que el padre sepa que el formulario se cerró
  }
}
