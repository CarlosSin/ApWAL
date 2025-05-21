import { Component } from '@angular/core';
import { SideMenuAdminComponent } from '../../../components/side-menu-admin/side-menu-admin.component'
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  imports: [    SideMenuAdminComponent,
    RouterOutlet],
  templateUrl: './crear-usuario.component.html',
})
export class CrearUsuarioComponent { }