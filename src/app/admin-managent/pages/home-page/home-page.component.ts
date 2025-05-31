import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {SideMenuAdminComponent} from '../../components/side-menu-admin/side-menu-admin.component';


@Component({
  selector: 'app-home-page',
  imports: [RouterLink, RouterOutlet, SideMenuAdminComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent { }
