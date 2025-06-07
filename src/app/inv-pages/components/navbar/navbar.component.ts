import { Component } from '@angular/core';
import {MenuUsuarioHeaderComponent} from '../../../shared/components/menu-usuario-header/menu-usuario-header.component';

@Component({
  selector: 'inv-navbar',
  imports: [MenuUsuarioHeaderComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent { }
