import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MenuUsuarioHeaderComponent} from '../../../shared/components/menu-usuario-header/menu-usuario-header.component';

@Component({
  selector: 'admin-navbar',
  imports: [RouterLink, MenuUsuarioHeaderComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent { }
