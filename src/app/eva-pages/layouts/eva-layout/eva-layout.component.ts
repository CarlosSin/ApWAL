import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "../../components/menu/menu.component";

@Component({
  selector: 'app-eva-layout',
  imports: [NavbarComponent, RouterOutlet, MenuComponent],
  templateUrl: './eva-layout.component.html',
})
export class EvaLayoutComponent { }
