import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-inv-layout',
  imports: [RouterOutlet, SideMenuComponent, NavbarComponent],
  templateUrl: './inv-layout.component.html',
})
export class InvLayoutComponent { }
