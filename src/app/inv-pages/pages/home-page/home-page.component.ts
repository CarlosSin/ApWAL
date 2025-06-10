import { Component, inject } from '@angular/core';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { Router, RouterLink } from '@angular/router';
import { FormProgressService } from '../../services/form-progress.service';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private router = inject(Router);
  private formProgressService = inject(FormProgressService);

  crearNuevoProtocolo() {
    this.formProgressService.resetProgreso(); // <<< Limpiar estado anterior
    this.router.navigate(['/inv/protocol-register']);
  }

}
