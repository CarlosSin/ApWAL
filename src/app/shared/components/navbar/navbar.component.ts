import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

constructor(private location: Location){

  }

  volver() {
    this.location.back();
  }


 }
