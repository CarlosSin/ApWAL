import { Component, inject, OnInit  } from '@angular/core';
import { UsuariosService,usuarioRules } from '../../get-info-users/usuarios.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {ModifyUsersComponent} from '../../modify-users/modify-users.component';


@Component({
  selector: 'app-lista-usuarios',
  standalone:true,
  imports: [CommonModule,HttpClientModule,ModifyUsersComponent],
  templateUrl: './lista-usuarios.component.html',
})

export class ListaUsuariosComponent implements OnInit {
  private usuariosService = inject(UsuariosService);
  usuariosdb: usuarioRules[] = [];

  showModificationForm: boolean = false;
  selectedUserToModify: usuarioRules | undefined; // Aquí guardaremos el usuario seleccionado
  
  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(data => {
      console.log('Usuarios recibidos:', data);
      this.usuariosdb = data;
    });
  }

  getID_modificacion(ID:number){
    const usuario_encontrado = this.usuariosdb.find(usuario => usuario.no_decontrol_usuario === ID);
    if (usuario_encontrado) {
      console.log('El usuario a modificar es:', usuario_encontrado);
      // Asigna el usuario encontrado a la variable de estado
      this.selectedUserToModify = usuario_encontrado;
      // Muestra el formulario de modificación
      this.showModificationForm = true;
    } else {
      console.log('No se encontró el usuario con el ID:', ID);
      // Puedes manejar este caso, por ejemplo, mostrando un mensaje al usuario
    }  
  }

    // Método para manejar el evento cuando el formulario de modificación se cierra
  closeModificationForm(): void {
    this.showModificationForm = false; // Oculta el formulario
    this.selectedUserToModify = undefined; // Limpia el usuario seleccionado
    // Opcional: Vuelve a cargar los usuarios si los cambios en la DB se reflejan de inmediato
    // this.usuariosService.getUsuarios().subscribe(data => { this.usuariosdb = data; });
  }

  // Método para manejar cuando el usuario es guardado desde el formulario (opcional)
  handleUserSaved(updatedUser: usuarioRules): void {
    console.log('Usuario guardado en el componente padre:', updatedUser);
    // Aquí puedes actualizar tu lista de usuarios localmente si no recargas todos los datos
    const index = this.usuariosdb.findIndex(u => u.no_decontrol_usuario === updatedUser.no_decontrol_usuario);
    if (index !== -1) {
      this.usuariosdb[index] = updatedUser;
    }
  }
  
  getID_nuevorol(ID:number){
    console.log(ID);
  }
}
