import { Component } from '@angular/core';
import { MenuRegisterComponent } from "../../components/menu-register/menu-register.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pilot-register',
  imports: [MenuRegisterComponent, RouterOutlet],
  templateUrl: './pilot-register.component.html',
})
export class PilotRegisterComponent { }
