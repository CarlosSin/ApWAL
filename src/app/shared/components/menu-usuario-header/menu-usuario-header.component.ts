import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'menu-usuario-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-usuario-header.component.html',
})
export class MenuUsuarioHeaderComponent implements OnInit {
  mostrarFormulario = false;
  usuario: string = '';
  roles: string[] = [];
  noControl: string = '---';
  departamento: string = '---';

  ngOnInit() {
    const user = localStorage.getItem('usuario');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        this.usuario = parsed.nombre_usuario || '---';
        this.roles = parsed.roles || [];

        if (parsed.no_decontrol) this.noControl = parsed.no_decontrol;
        if (parsed.departamento) this.departamento = parsed.departamento;
      } catch (err) {
        console.error('Error al leer usuario del localStorage:', err);
      }
    }
  }

  Formulario_open() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    location.href = '/';
  }

  cambiarDeRol() {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) return;

    try {
      const parsed = JSON.parse(usuario);
      const roles: string[] = parsed.roles || [];

      if (roles.includes('Investigador') && roles.includes('Evaluador')) {
        const rutaActual = window.location.pathname;

        if (rutaActual.includes('/inv')) {
          location.href = '/eva'; // Cambiar a Evaluador
        } else if (rutaActual.includes('/eva')) {
          location.href = '/inv'; // Cambiar a Investigador
        } else {
          console.warn('Ruta actual desconocida para cambio de rol.');
        }

      } else {
        alert('Tu cuenta no tiene múltiples roles disponibles para cambiar.');
      }

    } catch (err) {
      console.error('Error al cambiar de rol:', err);
    }
  }

}
