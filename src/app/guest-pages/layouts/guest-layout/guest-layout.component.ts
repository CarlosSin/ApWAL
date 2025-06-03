import { Component } from '@angular/core';
import { NavbarComponent } from "../../../eva-pages/components/navbar/navbar.component";
import { GuestMenuComponent } from "../../components/guest-menu/guest-menu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-guest-layout',
  imports: [RouterOutlet, NavbarComponent, GuestMenuComponent],
  templateUrl: './guest-layout.component.html',
})
export class GuestLayoutComponent { }
