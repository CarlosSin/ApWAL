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
  submenuOpen2 = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleSubmenu() {
    this.submenuOpen = !this.submenuOpen;
  }

  toggleSubmenu2() {
    this.submenuOpen2 = !this.submenuOpen2;
  }
}
