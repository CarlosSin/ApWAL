import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SideMenuAtributoComponent} from '../../../../admin-managent/components/side-menu-atributo/side-menu-atributo.component';

@Component({
  selector: 'app-agregar-atributo',
  imports: [SideMenuAtributoComponent,RouterOutlet],
  templateUrl: './agregar-atributo.component.html',
})
export class AgregarAtributoComponent { }
