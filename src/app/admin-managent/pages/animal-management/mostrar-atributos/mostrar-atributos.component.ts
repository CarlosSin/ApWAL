import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuMostrarAtributoComponent} from '../../../components/side-menu-mostrar-atributo/side-menu-mostrar-atributo.component';

@Component({
  selector: 'app-mostrar-atributos',
  imports: [RouterOutlet,SideMenuMostrarAtributoComponent],
  templateUrl: './mostrar-atributos.component.html',
})
export class MostrarAtributosComponent { }
