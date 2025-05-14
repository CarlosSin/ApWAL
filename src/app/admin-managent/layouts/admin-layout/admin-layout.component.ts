import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent { }
