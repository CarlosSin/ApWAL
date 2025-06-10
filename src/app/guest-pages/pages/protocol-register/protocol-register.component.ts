import { Component } from '@angular/core';
import { MenuRegisterComponent } from "../../components/menu-register/menu-register.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-protocol-register',
  imports: [MenuRegisterComponent, RouterOutlet],
  templateUrl: './protocol-register.component.html',
})
export class ProtocolRegisterComponent { }
