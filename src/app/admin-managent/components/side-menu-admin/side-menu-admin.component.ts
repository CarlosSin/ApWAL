import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'side-menu-admin',
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu-admin.component.html',
})
export class SideMenuAdminComponent {
  menuOpen = false;
  submenuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleSubmenu() {
    this.submenuOpen = !this.submenuOpen;
  }
}
