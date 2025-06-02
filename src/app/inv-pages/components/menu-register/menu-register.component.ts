import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormProgressService } from '../../services/form-progress.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'menu-register',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './menu-register.component.html',
  styleUrl: './menu-register.component.scss'
})
export class MenuRegisterComponent {

  constructor(public formProgressService: FormProgressService) {}

  // Este método lo puedes usar en el HTML para verificar si habilitar un enlace
  canAccess(section: string): boolean {
    return this.formProgressService.canAccess(section);
  }
}
