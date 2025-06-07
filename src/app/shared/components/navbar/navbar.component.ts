import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {MenuUsuarioHeaderComponent} from '../menu-usuario-header/menu-usuario-header.component';

@Component({
  selector: 'app-navbar',
  imports: [MenuUsuarioHeaderComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

constructor(private location: Location){

  }

  volver() {
    this.location.back();
  }


 }
