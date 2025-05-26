import { Component } from '@angular/core';
import {SideMenuNewuserComponent} from '../../../components/side-menu-newuser/side-menu-newuser.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  imports: [SideMenuNewuserComponent, RouterOutlet],
  templateUrl: './crear-usuario.component.html',
})
export class CrearUsuarioComponent { }
