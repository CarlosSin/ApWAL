import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'menu-usuario-header',
  imports: [CommonModule],
  templateUrl: './menu-usuario-header.component.html',
})
export class MenuUsuarioHeaderComponent { 
  mostrarFormulario = false;

  Formulario_open() {
    console.log('¡Botón presionado!');
    this.mostrarFormulario = !this.mostrarFormulario;
  }
   
}
