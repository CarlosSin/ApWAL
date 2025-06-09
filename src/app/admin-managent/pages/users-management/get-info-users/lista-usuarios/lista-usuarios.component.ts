import { Component, inject, OnInit  } from '@angular/core';
import { UsuariosService,usuarioRules } from '../../get-info-users/usuarios.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-usuarios',
  standalone:true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './lista-usuarios.component.html',
})

export class ListaUsuariosComponent implements OnInit {
  private usuariosService = inject(UsuariosService);
  usuariosdb: usuarioRules[] = [];

  
  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(data => {
      console.log('Usuarios recibidos:', data);
      this.usuariosdb = data;
    });
  }
}
