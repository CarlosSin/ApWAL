import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-eva-layout',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './eva-layout.component.html',
})
export class EvaLayoutComponent { }
